import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserUpdateDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user)
      throw new NotFoundException("کاربری با این 'نام کاربری' پیدا نشد");

    return user;
  }

  async update(username: string, userUpdateDto: UserUpdateDto) {
    const userExist = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!userExist)
      throw new NotFoundException("کاربری با این 'نام کاربری' پیدا نشد");

    return await this.prisma.user.update({
      where: { username },
      data: {
        ...userExist,
        isActive: userUpdateDto.isActive || userExist.isActive,
        isDeleted: userUpdateDto.isDeleted || userExist.isDeleted,
        role: userUpdateDto.role || userExist.role,
      },
    });
  }

  async remove(id: string) {
    const userExist = await this.prisma.user.findUnique({ where: { id } });
    if (!userExist)
      throw new NotFoundException('کاربری با این مشخصات پیدا نشد.');

    return this.prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
