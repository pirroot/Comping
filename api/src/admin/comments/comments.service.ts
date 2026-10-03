import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCommentDto) {
    const [user, product] = await Promise.all([
      this.prisma.user.findFirst({
        where: { id: dto.userId, isDeleted: false, isActive: true },
        select: { id: true },
      }),
      this.prisma.product.findFirst({
        where: { id: dto.productId, isDeleted: false, isActive: true },
        select: { id: true },
      }),
    ]);
    if (!user) throw new NotFoundException('کاربر فعال پیدا نشد.');
    if (!product) throw new NotFoundException('محصول فعال پیدا نشد.');

    if (dto.parentId) {
      const parent = await this.findOne(dto.parentId);
      if (parent.productId !== dto.productId) {
        throw new BadRequestException('دیدگاه والد برای این محصول نیست.');
      }
    }
    return this.prisma.comment.create({
      data: dto,
      include: {
        user: { select: { id: true, username: true, name: true } },
        product: { select: { id: true, title: true } },
      },
    });
  }

  findAll() {
    return this.prisma.comment.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, username: true, name: true } },
        product: { select: { id: true, title: true } },
        replies: { where: { isDeleted: false } },
      },
    });
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findFirst({
      where: { id, isDeleted: false },
      include: {
        user: { select: { id: true, username: true, name: true } },
        product: { select: { id: true, title: true } },
        replies: { where: { isDeleted: false } },
      },
    });
    if (!comment) throw new NotFoundException('دیدگاه پیدا نشد.');
    return comment;
  }

  async update(id: string, dto: UpdateCommentDto) {
    await this.findOne(id);
    return this.prisma.comment.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.comment.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
