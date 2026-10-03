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
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandsService } from './brands.service';
import { multerOptions } from '../../uploads/multer.config';

@Controller('admin/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo', multerOptions('brands')))
  create(
    @Body() dto: CreateBrandDto,
    @UploadedFile() logo?: Express.Multer.File,
  ) {
    return this.brandsService.create(dto, logo);
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('logo', multerOptions('brands')))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBrandDto,
    @UploadedFile() logo?: Express.Multer.File,
  ) {
    return this.brandsService.update(id, dto, logo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
