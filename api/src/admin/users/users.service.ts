import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserUpdateDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        username: true,
        phone: true,
        name: true,
        family: true,
        avatar: true,
        role: true,
        isActive: true,
        isDeleted: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username, isDeleted: false },
      select: {
        id: true,
        username: true,
        phone: true,
        name: true,
        family: true,
        avatar: true,
        role: true,
        isActive: true,
        isDeleted: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
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
      data: userUpdateDto,
    });
  }

  async remove(id: string) {
    const userExist = await this.prisma.user.findUnique({ where: { id } });
    if (!userExist)
      throw new NotFoundException('کاربری با این مشخصات پیدا نشد.');

    return this.prisma.user.update({
      where: { id },
      data: { isDeleted: true, isActive: false },
    });
  }
}
