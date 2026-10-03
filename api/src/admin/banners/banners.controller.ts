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
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { multerOptions } from '../../uploads/multer.config';

@Controller('admin/banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions('banners')))
  create(
    @Body() dto: CreateBannerDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.bannersService.create(dto, image);
  }

  @Get()
  findAll() {
    return this.bannersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions('banners')))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBannerDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.bannersService.update(id, dto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannersService.remove(id);
  }
}
