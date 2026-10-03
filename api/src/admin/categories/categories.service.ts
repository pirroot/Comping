import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UploadsService } from '../../uploads/uploads.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadsService: UploadsService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ) {
    const cate = await this.prisma.category.findUnique({
      where: { slug: createCategoryDto.slug },
    });
    if (cate) throw new ConflictException('دسته بندی با این اسلاگ وجود دارد.');
    if (
      createCategoryDto.parentId &&
      !(await this.prisma.category.findFirst({
        where: { id: createCategoryDto.parentId, isDeleted: false },
      }))
    ) {
      throw new ConflictException('دسته‌بندی والد معتبر نیست.');
    }
    const image = file?.path
      ? await this.uploadsService.upload(file, 'productCategories')
      : undefined;

    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        image: image?.url,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      where: {
        isDeleted: false,
        parent: null,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        description: true,
        parentId: true,
        createdAt: true,
        updatedAt: true,
        isDeleted: true,
        isActive: true,
        children: { where: { isDeleted: false }, orderBy: { title: 'asc' } },
        parent: {
          where: {
            isDeleted: false,
          },
          select: { title: true, slug: true, id: true },
        },
        products: {
          where: {
            isDeleted: false,
          },
          select: { title: true, id: true },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id, isDeleted: false },
      include: {
        parent: true,
        children: { where: { isDeleted: false } },
        products: { where: { isDeleted: false } },
      },
    });
    if (!category) throw new NotFoundException('همچین دسته بندی وجود ندارد .');

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    file: Express.Multer.File,
  ) {
    const category = await this.prisma.category.findFirst({
      where: { id, isDeleted: false },
    });
    if (!category) throw new NotFoundException('همچین دسته بندی وجود ندارد .');

    if (
      updateCategoryDto.slug &&
      updateCategoryDto.slug !== category.slug &&
      (await this.prisma.category.findUnique({
        where: { slug: updateCategoryDto.slug },
      }))
    ) {
      throw new ConflictException('دسته بندی با این اسلاگ وجود دارد.');
    }

    if (
      updateCategoryDto.parentId === id ||
      (updateCategoryDto.parentId &&
        !(await this.prisma.category.findFirst({
          where: { id: updateCategoryDto.parentId, isDeleted: false },
        })))
    ) {
      throw new ConflictException('دسته‌بندی والد معتبر نیست.');
    }

    const image = file?.path
      ? await this.uploadsService.upload(file, 'productCategories')
      : undefined;

    return this.prisma.category.update({
      where: { id },
      data: {
        ...updateCategoryDto,
        ...(image ? { image: image.url } : {}),
      },
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id, isDeleted: false },
    });
    if (!category)
      throw new NotFoundException('همچین دسته بندی وجود ندارد یا حذف شده است.');

    return await this.prisma.category.update({
      where: { id },
      data: { isActive: false, isDeleted: true },
    });
  }
}
