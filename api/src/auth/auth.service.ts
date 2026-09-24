import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomBytes, randomInt, timingSafeEqual } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { VerifyDto } from './dto/verify.dto';

const OTP_TTL_MS = 2 * 60 * 1000;
const OTP_COOLDOWN_MS = 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async request(authDto: AuthDto) {
    const { phone } = authDto;

    const existing = await this.prisma.otp.findUnique({ where: { phone } });

    if (
      existing &&
      existing.expiresAt.getTime() - Date.now() > OTP_TTL_MS - OTP_COOLDOWN_MS
    ) {
      throw new HttpException(
        'لطفاً کمی صبر کنید و دوباره تلاش کنید.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const code = randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

    await this.prisma.otp.upsert({
      where: { phone },
      update: { code, expiresAt, attempts: 0 },
      create: { phone, code, expiresAt, attempts: 0 },
    });

    // TODO: اینجا SMS بفرست
    // await this.smsService.send(phone, `کد ورود: ${code}`);
    console.log(code);

    return {
      message: 'کد تایید ارسال شد.',
      expiresIn: OTP_TTL_MS / 1000,
    };
  }

  async verifyCode(dto: VerifyDto) {
    const { phone, code } = dto;

    const otp = await this.prisma.otp.findUnique({ where: { phone } });
    if (!otp) throw new BadRequestException('کدی برای این شماره ارسال نشده.');

    if (otp.expiresAt < new Date()) {
      await this.prisma.otp.delete({ where: { phone } });
      throw new BadRequestException('کد منقضی شده است.');
    }

    if (otp.attempts >= OTP_MAX_ATTEMPTS) {
      await this.prisma.otp.delete({ where: { phone } });
      throw new BadRequestException(
        'تعداد تلاش بیش از حد. دوباره درخواست کد کنید.',
      );
    }

    if (!this.safeEqual(otp.code, code)) {
      await this.prisma.otp.update({
        where: { phone },
        data: { attempts: { increment: 1 } },
      });
      throw new BadRequestException('کد وارد شده صحیح نیست.');
    }

    // کد درسته، یک‌بارمصرف: پاکش کن
    await this.prisma.otp.delete({ where: { phone } });

    // کاربر رو پیدا کن یا بساز
    let user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          phone,
          username: phone,
          role: 'USER',
          isActive: true,
        },
      });
    }

    if (!user.isActive || user.isDeleted) {
      throw new UnauthorizedException('حساب کاربری غیرفعال است.');
    }

    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.issueRefreshToken(user.id);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return { accessToken, refreshToken };
  }

  // ============ رفرش توکن (با rotation) ============
  async refresh(refreshToken: string) {
    const { selector, validator } = this.parseRefreshToken(refreshToken);

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { selector },
    });

    if (
      !storedToken ||
      storedToken.revoked ||
      storedToken.expiresAt <= new Date()
    ) {
      throw new UnauthorizedException(
        'Refresh token نامعتبر یا منقضی شده است.',
      );
    }

    if (!this.safeEqual(this.hash(validator), storedToken.validator)) {
      // احتمال دزدیده شدن توکن: همه توکن‌های کاربر رو باطل کن
      await this.prisma.refreshToken.updateMany({
        where: { userId: storedToken.userId, revoked: false },
        data: { revoked: true },
      });
      throw new UnauthorizedException(
        'Refresh token نامعتبر یا منقضی شده است.',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: storedToken.userId },
    });

    if (!user || !user.isActive || user.isDeleted) {
      throw new UnauthorizedException('کاربر معتبر نیست.');
    }

    // توکن قبلی رو باطل کن (rotation)
    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

    const newRefreshToken = await this.issueRefreshToken(user.id);
    const accessToken = await this.signAccessToken(user);

    return { accessToken, refreshToken: newRefreshToken };
  }

  // ============ خروج ============
  async logout(refreshToken: string) {
    const { selector, validator } = this.parseRefreshToken(refreshToken);

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { selector },
    });

    if (
      !storedToken ||
      !this.safeEqual(this.hash(validator), storedToken.validator)
    ) {
      throw new UnauthorizedException('Refresh token نامعتبر است.');
    }

    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

    return { message: 'با موفقیت خارج شدید.' };
  }

  // ============ توابع کمکی ============
  private signAccessToken(user: {
    id: string;
    phone: string | null;
    role: string;
  }) {
    return this.jwtService.signAsync({
      id: user.id,
      phone: user.phone,
      role: user.role,
    });
  }

  private async issueRefreshToken(userId: string): Promise<string> {
    const selector = randomBytes(16).toString('hex');
    const validator = randomBytes(32).toString('hex');

    await this.prisma.refreshToken.create({
      data: {
        selector,
        validator: this.hash(validator), // SHA-256 کافیه چون validator خودش random و قویه
        userId,
        expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
      },
    });

    return `${selector}.${validator}`;
  }

  private parseRefreshToken(token: string) {
    const [selector, validator] = (token ?? '').split('.');
    if (!selector || !validator) {
      throw new UnauthorizedException('Refresh token نامعتبر است.');
    }
    return { selector, validator };
  }

  private hash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }

  // مقایسه امن (ضد timing attack)
  private safeEqual(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
  }
}
