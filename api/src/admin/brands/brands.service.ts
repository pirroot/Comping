import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UploadsService } from '../../uploads/uploads.service';

@Injectable()
export class BrandsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploads: UploadsService,
  ) {}

  async create(dto: CreateBrandDto, logo?: Express.Multer.File) {
    if (await this.prisma.brand.findUnique({ where: { slug: dto.slug } })) {
      throw new ConflictException('برندی با این شناسه وجود دارد.');
    }
    const uploaded = logo?.path
      ? await this.uploads.upload(logo, 'brands')
      : undefined;
    return this.prisma.brand.create({
      data: { ...dto, logo: uploaded?.url ?? dto.logo },
    });
  }

  findAll() {
    return this.prisma.brand.findMany({
      where: { isDeleted: false },
      include: {
        _count: { select: { products: { where: { isDeleted: false } } } },
      },
      orderBy: [{ sort: 'asc' }, { title: 'asc' }],
    });
  }

  async findOne(id: string) {
    const brand = await this.prisma.brand.findFirst({
      where: { id, isDeleted: false },
      include: {
        _count: { select: { products: { where: { isDeleted: false } } } },
      },
    });
    if (!brand) throw new NotFoundException('برند پیدا نشد.');
    return brand;
  }

  async update(id: string, dto: UpdateBrandDto, logo?: Express.Multer.File) {
    const existing = await this.findOne(id);
    if (
      dto.slug &&
      dto.slug !== existing.slug &&
      (await this.prisma.brand.findUnique({ where: { slug: dto.slug } }))
    ) {
      throw new ConflictException('برندی با این شناسه وجود دارد.');
    }
    const uploaded = logo?.path
      ? await this.uploads.upload(logo, 'brands')
      : undefined;
    return this.prisma.brand.update({
      where: { id },
      data: { ...dto, logo: uploaded?.url ?? dto.logo },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.brand.update({
      where: { id },
      data: { isDeleted: true, isActive: false },
    });
  }
}
