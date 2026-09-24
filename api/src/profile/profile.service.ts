import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUser } from 'src/common/types/auth-user.type';
import { UploadsService } from 'src/uploads/uploads.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadsService,
  ) {}

  async getProfile(user: AuthUser) {
    const profile = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!profile) throw new NotFoundException('کاربر پیدا نشد.');

    return profile;
  }

  async update(user: AuthUser, updateProfileDto: UpdateProfileDto) {
    const userExits = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!userExits)
      throw new NotFoundException('کاربری با این امکانات پیدا نشد.');
    console.log(userExits, updateProfileDto);
    const updatedProfile = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...updateProfileDto,
      },
    });

    return { updatedProfile, message: 'profile updated.' };
  }

  async updateProfileImage(user: AuthUser, file: Express.Multer.File) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!userExists)
      throw new NotFoundException('کاربری با این امکانات پیدا نشد.');

    if (!file) throw new ConflictException('پروفایل کاربر ارسال نشده است.');

    if (userExists.avatar) this.uploadService.delete(userExists.avatar);

    await this.uploadService.upload(file, 'avatar');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { avatar: file.path },
    });
  }
}
