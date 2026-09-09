import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const { email, password } = authDto;
    const userExist = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!userExist) {
      throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است.');
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است.');
    }

    const payload = {
      id: userExist.id,
      email: userExist.email,
      role: userExist.role,
    };

    // create an accessToken
    const accessToken = await this.jwtService.signAsync(payload);

    // create + persist a refresh token (selector/validator pattern)
    const refreshToken = await this.issueRefreshToken(userExist.id);

    // set a last login
    await this.prisma.user.update({
      where: { id: userExist.id },
      data: { lastLogin: new Date() },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(authDto: AuthDto) {
    const { email, password } = authDto;

    const emailExist = await this.prisma.user.findFirst({
      where: { email },
    });

    if (emailExist) throw new ConflictException('شما قبلا ثبت نام کرداید.');

    const hashedPasswd = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: {
        username: email.split('@')[0],
        email: email,
        password: hashedPasswd,
        name: 'name' + email,
        family: email + 'family',
        role: 'USER',
        isActive: true,
      },
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: true,
      emailVerified: false,
    };
  }

  async refresh(refreshToken: string) {
    const [selector, validator] = refreshToken.split('.');

    if (!selector || !validator) {
      throw new UnauthorizedException(
        'Refresh token نامعتبر یا منقضی شده است.',
      );
    }

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

    const isValid = await bcrypt.compare(validator, storedToken.validator);

    if (!isValid) {
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

    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

    const newRefreshToken = await this.issueRefreshToken(user.id);

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  private async issueRefreshToken(userId: string): Promise<string> {
    const selector = randomBytes(16).toString('hex');
    const validator = randomBytes(32).toString('hex');

    const hashedValidator = await bcrypt.hash(validator, 12);

    await this.prisma.refreshToken.create({
      data: {
        selector,
        validator: hashedValidator,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return `${selector}.${validator}`;
  }

  async logout(refreshToken: string) {
    const [selector, validator] = refreshToken.split('.');

    if (!selector || !validator)
      throw new UnauthorizedException('Refresh Token نامعتبر است.');

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { selector },
    });

    if (!storedToken)
      throw new UnauthorizedException('Refresh token نامعتبر است.');

    const isValid = await bcrypt.compare(validator, storedToken.validator);

    if (!isValid) throw new UnauthorizedException('Refresh Token نامعتبر است.');

    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

    return {
      message: 'با موفقیت خارج شدید.',
    };
  }
}
