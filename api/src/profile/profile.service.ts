import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUser } from 'src/common/types/auth-user.type';
import { UploadsService } from 'src/uploads/uploads.service';
import { CreateProfileOrderDto } from './dto/create-profile-order.dto';
import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadsService,
  ) {}

  async getProfile(user: AuthUser) {
    const profile = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        phone: true,
        name: true,
        family: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
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
    const updatedProfile = await this.prisma.user.update({
      where: { id: user.id },
      data: updateProfileDto,
      select: {
        id: true,
        username: true,
        phone: true,
        name: true,
        family: true,
        avatar: true,
        role: true,
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

    if (!file?.path)
      throw new ConflictException('تصویر پروفایل ارسال نشده است.');
    const uploaded = await this.uploadService.upload(file, 'avatar');
    return this.prisma.user.update({
      where: { id: user.id },
      data: { avatar: uploaded.url },
      select: { id: true, avatar: true },
    });
  }

  getOrders(user: AuthUser) {
    return this.prisma.order.findMany({
      where: { userId: user.id, isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                slug: true,
                images: {
                  where: { main: true },
                  take: 1,
                  select: { url: true, alt: true },
                },
              },
            },
          },
        },
      },
    });
  }

  async createOrder(user: AuthUser, dto: CreateProfileOrderDto) {
    const productIds = [...new Set(dto.items.map((item) => item.productId))];
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
        isDeleted: false,
      },
      select: { id: true, price: true },
    });
    if (products.length !== productIds.length) {
      throw new NotFoundException('یک یا چند محصول دیگر موجود نیست.');
    }

    const priceById = new Map(
      products.map((product) => [product.id, product.price]),
    );
    const total = dto.items.reduce(
      (sum, item) => sum.add(priceById.get(item.productId)!.mul(item.quantity)),
      new Prisma.Decimal(0),
    );
    const shippingCost =
      total.lessThan(2_000_000) || dto.shippingMethod === 'express'
        ? new Prisma.Decimal(85_000)
        : new Prisma.Decimal(0);

    return this.prisma.order.create({
      data: {
        orderNumber: `CMP-${Date.now()}-${randomUUID().slice(0, 8)}`,
        userId: user.id,
        total: total.add(shippingCost),
        shippingCost,
        shippingName: dto.shippingName,
        shippingPhone: dto.shippingPhone,
        shippingAddress: dto.shippingAddress,
        postalCode: dto.postalCode,
        shippingUnit: dto.shippingUnit,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: priceById.get(item.productId)!,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: { select: { id: true, title: true, slug: true } },
          },
        },
      },
    });
  }
}
