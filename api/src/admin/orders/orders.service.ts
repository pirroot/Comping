import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const user = await this.prisma.user.findFirst({
      where: { id: dto.userId, isDeleted: false, isActive: true },
      select: { id: true },
    });
    if (!user) throw new NotFoundException('کاربر فعال پیدا نشد.');

    const productIds = [...new Set(dto.items.map((item) => item.productId))];
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
        isDeleted: false,
        isActive: true,
      },
      select: { id: true, price: true },
    });
    if (products.length !== productIds.length) {
      throw new NotFoundException('یک یا چند محصول فعال پیدا نشد.');
    }

    const priceByProductId = new Map(
      products.map((product) => [product.id, product.price]),
    );
    const total = dto.items.reduce(
      (sum, item) =>
        sum.add(
          priceByProductId
            .get(item.productId)!
            .mul(item.quantity),
        ),
      new Prisma.Decimal(0),
    );

    return this.prisma.order.create({
      data: {
        orderNumber: `CMP-${Date.now()}-${randomUUID().slice(0, 8)}`,
        userId: dto.userId,
        total,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: priceByProductId.get(item.productId)!,
          })),
        },
      },
      include: {
        user: { select: { id: true, username: true, name: true, phone: true } },
        items: { include: { product: { select: { id: true, title: true } } } },
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, username: true, name: true, phone: true } },
        items: { include: { product: { select: { id: true, title: true } } } },
      },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, isDeleted: false },
      include: {
        user: { select: { id: true, username: true, name: true, phone: true } },
        items: { include: { product: { select: { id: true, title: true } } } },
      },
    });
    if (!order) throw new NotFoundException('سفارش پیدا نشد.');
    return order;
  }

  async update(id: string, dto: UpdateOrderDto) {
    await this.findOne(id);
    return this.prisma.order.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.order.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
