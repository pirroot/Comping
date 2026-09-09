import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginationQueryDto } from 'src/blog/dto/pagination-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/uploads/multer.config';
import { CreateProductDto } from './dto/create-product.dto copy';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthUser } from 'src/common/types/auth-user.type';
import { UpdateProductDto } from './dto/update-product.dto';

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
  findAll(@Param() paginationQuery: PaginationQueryDto) {
    this.productsService.getAll(paginationQuery);
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
