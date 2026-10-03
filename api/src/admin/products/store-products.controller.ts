import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../blog/dto/pagination-query.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductsService } from './products.service';

@Controller('store')
export class StoreProductsController {
  constructor(
    private readonly products: ProductsService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('products')
  findAll(
    @Query() query: PaginationQueryDto,
    @Query('category') category?: string,
    @Query('sort') sort?: 'newest' | 'price-asc' | 'price-desc',
  ) {
    return this.products.getStoreAll(query, category, sort);
  }

  @Get('products/:slug')
  findOne(@Param('slug') slug: string) {
    return this.products.getStoreOne(slug);
  }

  @Get('categories')
  categories() {
    return this.prisma.category.findMany({
      where: { isActive: true, isDeleted: false },
      select: { id: true, title: true, slug: true, image: true, parentId: true },
      orderBy: { title: 'asc' },
    });
  }
}
