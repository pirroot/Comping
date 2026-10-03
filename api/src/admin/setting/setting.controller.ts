import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('admin/settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post()
  create(@Body() dto: CreateSettingDto) {
    return this.settingService.create(dto);
  }

  @Get()
  findAll() {
    return this.settingService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.settingService.findOne(key);
  }

  @Patch(':key')
  update(@Param('key') key: string, @Body() dto: UpdateSettingDto) {
    return this.settingService.update(key, dto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.settingService.remove(key);
  }
}