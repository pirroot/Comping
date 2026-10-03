import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto copy';
import { AuthUser } from 'src/common/types/auth-user.type';
import { PaginationQueryDto } from 'src/blog/dto/pagination-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UploadsService } from 'src/uploads/uploads.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ProductFeatureDto } from './dto/create-product.dto copy';
import { UpdateProductFeatureDto } from './dto/update-product-feature.dto';

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
          brandId: createProductDto.brandId,
          authorId: user.id,
          isActive: createProductDto.isActive ?? true,
        },
      });

      const features = await prisma.productFeature.createMany({
        data: createProductDto.features.map((feature) => ({
          ...feature,
          productId: product.id,
        })),
      });

      const productImage = await prisma.productImage.create({
        data: {
          publicId: randomUUID(),
          url: uploadResult.url,
          alt: createProductDto.title,
          main: true,
          productId: product.id,
        },
      });

      return {
        product,
        features,
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
        skip: (pgQuery.page - 1) * pgQuery.limit,
        take: pgQuery.limit,
        where: {
          isDeleted: false,
          title: {
            contains: pgQuery.search || undefined,
            mode: 'insensitive' as const,
          },
        },
        include: {
          images: { orderBy: { sort: 'asc' } },
          features: true,
          category: { select: { id: true, title: true, slug: true } },
          brand: { select: { id: true, title: true, slug: true, logo: true } },
        },
      }),
      this.prisma.product.count({
        where: {
          isDeleted: false,
          title: {
            contains: pgQuery.search || undefined,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return { products, count };
  }

  async getStoreAll(
    pgQuery: PaginationQueryDto,
    categorySlug?: string,
    sort: 'newest' | 'price-asc' | 'price-desc' = 'newest',
  ) {
    const where = {
      isActive: true,
      isDeleted: false,
      title: {
        contains: pgQuery.search || undefined,
        mode: 'insensitive' as const,
      },
      category: categorySlug ? { slug: categorySlug, isActive: true, isDeleted: false } : undefined,
    };
    const orderBy =
      sort === 'price-asc'
        ? { price: 'asc' as const }
        : sort === 'price-desc'
          ? { price: 'desc' as const }
          : { createdAt: 'desc' as const };

    const [products, count] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip: (pgQuery.page - 1) * pgQuery.limit,
        take: pgQuery.limit,
        include: {
          images: { orderBy: [{ main: 'desc' }, { sort: 'asc' }] },
          features: true,
          category: { select: { id: true, title: true, slug: true } },
          brand: { select: { id: true, title: true, slug: true, logo: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);
    return {
      products,
      count,
      page: pgQuery.page,
      limit: pgQuery.limit,
      totalPages: Math.ceil(count / pgQuery.limit),
    };
  }

  async getStoreOne(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug, isActive: true, isDeleted: false },
      include: {
        images: { orderBy: [{ main: 'desc' }, { sort: 'asc' }] },
        features: true,
        category: { select: { id: true, title: true, slug: true } },
        brand: { select: { id: true, title: true, slug: true, logo: true } },
      },
    });
    if (!product) throw new NotFoundException('محصول موردنظر پیدا نشد.');
    await this.prisma.product.update({
      where: { id: product.id },
      data: { views: { increment: 1 } },
    });
    return product;
  }

  async getOne(id: string) {
    const existProduct = await this.prisma.product.findFirst({
      where: { id, isDeleted: false },
      include: {
        images: { orderBy: { sort: 'asc' } },
        features: true,
        brand: true,
      },
    });
    if (!existProduct)
      throw new NotFoundException('محصولی با این مشخصات پیدا نشد.');

    return existProduct;
  }

  async update(
    id: string,
    upDto: UpdateProductDto,
    image?: Express.Multer.File,
  ) {
    const product = await this.prisma.product.findFirst({
      where: { id, isDeleted: false },
      include: { images: true },
    });
    if (!product) throw new NotFoundException('محصولی با این مشخصات پیدا نشد.');

    if (upDto.slug && upDto.slug !== product.slug) {
      const duplicate = await this.prisma.product.findUnique({
        where: { slug: upDto.slug },
      });
      if (duplicate)
        throw new ConflictException('این اسلاگ در محصول دیگری وجود دارد.');
    }

    const { features, ...fields } = upDto;
    const imageResult = image?.path
      ? await this.uploadServer.upload(
          image,
          `products/${upDto.slug ?? product.slug}`,
        )
      : undefined;

    return this.prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },
        data: fields,
      });

      if (features) {
        await tx.productFeature.deleteMany({ where: { productId: id } });
        await tx.productFeature.createMany({
          data: features.map((feature) => ({ ...feature, productId: id })),
        });
      }

      if (imageResult) {
        await tx.productImage.updateMany({
          where: { productId: id, main: true },
          data: { main: false },
        });
        await tx.productImage.create({
          data: {
            publicId: randomUUID(),
            url: imageResult.url,
            alt: fields.title ?? product.title,
            main: true,
            productId: id,
          },
        });
      }

      return tx.product.findUnique({
        where: { id },
        include: {
          images: { orderBy: { sort: 'asc' } },
          features: true,
          brand: true,
        },
      });
    });
  }

  private async assertProductExists(id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, isDeleted: false },
      select: { id: true, slug: true, title: true },
    });
    if (!product) throw new NotFoundException('محصولی با این مشخصات پیدا نشد.');
    return product;
  }

  async getImages(productId: string) {
    await this.assertProductExists(productId);
    return this.prisma.productImage.findMany({
      where: { productId },
      orderBy: [{ sort: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async addImage(
    productId: string,
    dto: CreateProductImageDto,
    file?: Express.Multer.File,
  ) {
    const product = await this.assertProductExists(productId);
    if (!file?.path)
      throw new ConflictException('تصویر محصول ارسال نشده است.');
    const uploaded = await this.uploadServer.upload(
      file,
      `products/${product.slug}`,
    );
    const existingImages = await this.prisma.productImage.count({
      where: { productId },
    });
    return this.prisma.productImage.create({
      data: {
        publicId: randomUUID(),
        url: uploaded.url,
        alt: dto.alt ?? product.title,
        sort: dto.sort ?? existingImages,
        main: existingImages === 0,
        productId,
      },
    });
  }

  async updateImage(
    productId: string,
    imageId: string,
    dto: UpdateProductImageDto,
  ) {
    await this.assertProductExists(productId);
    const image = await this.prisma.productImage.findFirst({
      where: { id: imageId, productId },
    });
    if (!image) throw new NotFoundException('تصویر محصول پیدا نشد.');

    if (dto.main === false && image.main) {
      const otherMain = await this.prisma.productImage.findFirst({
        where: { productId, main: true, id: { not: imageId } },
      });
      if (!otherMain)
        throw new ConflictException('حداقل یک تصویر اصلی برای محصول لازم است.');
    }

    return this.prisma.$transaction(async (tx) => {
      if (dto.main) {
        await tx.productImage.updateMany({
          where: { productId, main: true },
          data: { main: false },
        });
      }
      return tx.productImage.update({
        where: { id: imageId },
        data: dto,
      });
    });
  }

  async removeImage(productId: string, imageId: string) {
    await this.assertProductExists(productId);
    const image = await this.prisma.productImage.findFirst({
      where: { id: imageId, productId },
    });
    if (!image) throw new NotFoundException('تصویر محصول پیدا نشد.');

    return this.prisma.$transaction(async (tx) => {
      const deleted = await tx.productImage.delete({ where: { id: imageId } });
      if (image.main) {
        const nextMain = await tx.productImage.findFirst({
          where: { productId },
          orderBy: [{ sort: 'asc' }, { createdAt: 'asc' }],
        });
        if (nextMain) {
          await tx.productImage.update({
            where: { id: nextMain.id },
            data: { main: true },
          });
        }
      }
      return deleted;
    });
  }

  async getFeatures(productId: string) {
    await this.assertProductExists(productId);
    return this.prisma.productFeature.findMany({
      where: { productId },
      orderBy: { key: 'asc' },
    });
  }

  async addFeature(productId: string, dto: ProductFeatureDto) {
    await this.assertProductExists(productId);
    return this.prisma.productFeature.create({
      data: { ...dto, productId },
    });
  }

  async updateFeature(
    productId: string,
    featureId: string,
    dto: UpdateProductFeatureDto,
  ) {
    await this.assertProductExists(productId);
    const feature = await this.prisma.productFeature.findFirst({
      where: { id: featureId, productId },
    });
    if (!feature) throw new NotFoundException('ویژگی محصول پیدا نشد.');
    return this.prisma.productFeature.update({
      where: { id: featureId },
      data: dto,
    });
  }

  async removeFeature(productId: string, featureId: string) {
    await this.assertProductExists(productId);
    const feature = await this.prisma.productFeature.findFirst({
      where: { id: featureId, productId },
    });
    if (!feature) throw new NotFoundException('ویژگی محصول پیدا نشد.');
    return this.prisma.productFeature.delete({ where: { id: featureId } });
  }

  async remove(id: string) {
    const productExist = await this.prisma.product.findFirst({
      where: { id, isDeleted: false },
    });
    if (!productExist)
      throw new NotFoundException('محصولی با این مشخصات پیدا نشد.');

    return this.prisma.product.update({
      where: { id },
      data: { isDeleted: true, isActive: false },
    });
  }
}
