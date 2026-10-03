import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderByEnum } from 'src/common/types/filter_enum.type';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFaqDto: CreateFaqDto) {
    return await this.prisma.faq.create({
      data: { isDelete: false, ...createFaqDto },
    });
  }

  findAll(orBy: OrderByEnum = OrderByEnum.DESC) {
    return this.prisma.faq.findMany({
      where: { isDelete: false },
      orderBy: { createdAt: orBy },
    });
  }

  async findOne(id: string) {
    const faq = await this.prisma.faq.findFirst({
      where: { id, isDelete: false },
    });
    if (!faq) throw new NotFoundException('سوال متداول پیدا نشد.');
    return faq;
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    await this.findOne(id);
    return this.prisma.faq.update({ where: { id }, data: updateFaqDto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.faq.update({
      where: { id },
      data: { isDelete: true },
    });
  }
}
