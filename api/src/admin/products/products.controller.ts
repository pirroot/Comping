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
  UseGuards,
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
import { ProductFeatureDto } from './dto/create-product.dto copy';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { UpdateProductFeatureDto } from './dto/update-product-feature.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/types/auth-user.type';

@Controller('admin/products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MODERATOR)
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
  @UseInterceptors(FileInterceptor('image', multerOptions('products')))
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productsService.update(id, updateProductDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get(':id/images')
  getImages(@Param('id') id: string) {
    return this.productsService.getImages(id);
  }

  @Post(':id/images')
  @UseInterceptors(FileInterceptor('image', multerOptions('products')))
  addImage(
    @Param('id') id: string,
    @Body() dto: CreateProductImageDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productsService.addImage(id, dto, image);
  }

  @Patch(':id/images/:imageId')
  updateImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @Body() dto: UpdateProductImageDto,
  ) {
    return this.productsService.updateImage(id, imageId, dto);
  }

  @Delete(':id/images/:imageId')
  removeImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
  ) {
    return this.productsService.removeImage(id, imageId);
  }

  @Get(':id/features')
  getFeatures(@Param('id') id: string) {
    return this.productsService.getFeatures(id);
  }

  @Post(':id/features')
  addFeature(@Param('id') id: string, @Body() dto: ProductFeatureDto) {
    return this.productsService.addFeature(id, dto);
  }

  @Patch(':id/features/:featureId')
  updateFeature(
    @Param('id') id: string,
    @Param('featureId') featureId: string,
    @Body() dto: UpdateProductFeatureDto,
  ) {
    return this.productsService.updateFeature(id, featureId, dto);
  }

  @Delete(':id/features/:featureId')
  removeFeature(
    @Param('id') id: string,
    @Param('featureId') featureId: string,
  ) {
    return this.productsService.removeFeature(id, featureId);
  }
}
