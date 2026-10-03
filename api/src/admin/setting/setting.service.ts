import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSettingDto) {
    if (await this.prisma.setting.findUnique({ where: { key: dto.key } })) {
      throw new ConflictException('تنظیمی با این کلید از قبل ثبت شده است.');
    }
    return this.prisma.setting.create({ data: dto });
  }

  findAll() {
    return this.prisma.setting.findMany({
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    });
  }

  async findOne(key: string) {
    const setting = await this.prisma.setting.findUnique({ where: { key } });
    if (!setting) throw new NotFoundException('تنظیم پیدا نشد.');
    return setting;
  }

  async update(key: string, dto: UpdateSettingDto) {
    await this.findOne(key);
    if (dto.key && dto.key !== key) {
      const duplicate = await this.prisma.setting.findUnique({
        where: { key: dto.key },
      });
      if (duplicate)
        throw new ConflictException('تنظیمی با این کلید از قبل ثبت شده است.');
    }
    return this.prisma.setting.update({ where: { key }, data: dto });
  }

  async remove(key: string) {
    await this.findOne(key);
    return this.prisma.setting.delete({ where: { key } });
  }
}