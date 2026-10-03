import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { UploadsService } from '../../uploads/uploads.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BannersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploads: UploadsService,
  ) {}

  async create(dto: CreateBannerDto, image?: Express.Multer.File) {
    const uploaded = image?.path
      ? await this.uploads.upload(image, 'banners')
      : undefined;
    const imageUrl = uploaded?.url ?? dto.image;
    if (!imageUrl) throw new BadRequestException('تصویر بنر ارسال نشده است.');
    return this.prisma.banner.create({
      data: { ...dto, image: imageUrl },
    });
  }

  findAll() {
    return this.prisma.banner.findMany({
      orderBy: [{ sort: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new NotFoundException('بنر پیدا نشد.');
    return banner;
  }

  async update(id: string, dto: UpdateBannerDto, image?: Express.Multer.File) {
    await this.findOne(id);
    const uploaded = image?.path
      ? await this.uploads.upload(image, 'banners')
      : undefined;
    const { image: imageUrl, ...fields } = dto;
    return this.prisma.banner.update({
      where: { id },
      data: { ...fields, image: uploaded?.url ?? imageUrl },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.banner.delete({ where: { id } });
  }
}
