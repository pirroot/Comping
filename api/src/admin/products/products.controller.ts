import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto copy';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { AuthUser } from '../../common/types/auth-user.type';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { multerOptions } from '../../uploads/multer.config';
import { PaginationQueryDto } from '../../blog/dto/pagination-query.dto';

@Controller('admin/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions('products')))
  create(
    @CurrentUser() user: AuthUser,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productsService.create(user, createProductDto, image);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.productsService.getAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.revome(id);
  }
}
