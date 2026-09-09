import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadsService } from 'src/uploads/uploads.service';

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
    if (cate) throw new NotFoundException('دسته بندی با این اسلاگ وجود دارد.');

    if (file) {
      const imageFile = await this.uploadsService.upload(
        file,
        'productCategoies',
      );

      return await this.prisma.category.create({
        data: {
          ...createCategoryDto,
          image: imageFile.url,
        },
      });
    }

    return await this.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      where: {
        isActive: true,
        isDeleted: false,
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
        parent: {
          select: { title: true, slug: true, id: true },
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
      select: { parent: true },
    });
    if (!category) throw new NotFoundException('همچین دسته بندی وجود ندارد .');

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    file: Express.Multer.File,
  ) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException('همچین دسته بندی وجود ندارد .');

    if (file.path) {
      let imageFile = category.image;
      if (imageFile) await this.uploadsService.delete(imageFile);
      // Todo: delete Service not work ...
      const image = await this.uploadsService.upload(file, 'productCategoies');
      imageFile = image.url;
      return await this.prisma.category.update({
        where: { id },
        data: {
          ...updateCategoryDto,
          image: imageFile,
        },
      });
    }

    return await this.prisma.category.update({
      where: { id },
      data: {
        ...updateCategoryDto,
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
