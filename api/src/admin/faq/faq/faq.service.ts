import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderByEnum } from 'src/common/types/filter_enum.type';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createFaqDto: CreateFaqDto) {
    return await this.prisma.faq.create({ data: { isDelete: false, ...createFaqDto } });
  }

  findAll(orBy: OrderByEnum) {
    return this.prisma.faq.findMany({ orderBy: { createdAt: orBy } });
  }

  async remove(id: string) {
    return await this.prisma.faq.update({ where: { id }, data: { isDelete: true } });
  }
}
