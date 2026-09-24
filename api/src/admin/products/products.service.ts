import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto copy';
import { AuthUser } from 'src/common/types/auth-user.type';
import { retryWhen } from 'rxjs';
import { PaginationQueryDto } from 'src/blog/dto/pagination-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UploadsService } from 'src/uploads/uploads.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadServer: UploadsService,
  ) {}

  async create(
    user: AuthUser,
    createProductDto: CreateProductDto,
    image: Express.Multer.File,
  ) {
    const productExist = await this.prisma.product.findFirst({
      where: { slug: createProductDto.slug },
    });

    if (productExist)
      throw new ConflictException('این اسلاگ در محصول دیگری وجود دارد.');

    if (!image?.path)
      throw new ConflictException('برای محصول باید عکس انتخاب کنید');

    const uploadResult = await this.uploadServer.upload(
      image,
      'products/' + createProductDto.slug,
    );

    return await this.prisma.$transaction(async (prisma) => {
      const product = await prisma.product.create({
        data: {
          slug: createProductDto.slug,
          title: createProductDto.title,
          price: createProductDto.price,
          description: createProductDto.description,
          categoryId: createProductDto.categoryId,
          authorId: user.id,
          isActive: true,
        },
      });

      const feature = await prisma.productFeature.create({
        data: {
          key: createProductDto.features.key,
          value: createProductDto.features.value,
          productId: product.id,
        },
      });

      const productImage = await prisma.productImage.create({
        data: {
          publicId: createProductDto.title + product.id,
          url: uploadResult.url,
          alt: createProductDto.title,
          main: true,
          productId: product.id,
        },
      });

      return {
        product,
        feature,
        image: productImage,
      };
    });
  }

  async getAll(pgQuery: PaginationQueryDto) {
    const [products, count] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        orderBy: {
          createdAt: pgQuery.orderBy || 'desc',
        },
        skip: (pgQuery.page - 1) * 30,
        take: 30,
        where: {
          isDeleted: false,
          isActive: true,
          title: {
            contains: pgQuery.search || undefined,
            mode: 'insensitive' as const,
          },
        },
      }),
      this.prisma.product.count({ where: { isDeleted: false } }),
    ]);

    return { products, count };
  }

  async getOne(id: string) {
    const existProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existProduct)
      throw new NotFoundException('محصولی با این مشخصات پیدا نشد.');

    return existProduct;
  }

  async update(id: string, upDto: UpdateProductDto) {
    return 'ok :)))';
  }

  async revome(id: string) {
    const productExist = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!productExist)
      throw new NotFoundException('محصولی با این مشخصات پیدا نشد.');

    return this.prisma.product.update({
      where: { id },
      data: { isDeleted: true, isActive: false },
    });
  }

  async uploadImage(file: Express.Multer.File) {}
}
