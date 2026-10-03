import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthUser } from 'src/common/types/auth-user.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/uploads/multer.config';
import { Post } from '@nestjs/common';
import { CreateProfileOrderDto } from './dto/create-profile-order.dto';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@CurrentUser() user: AuthUser) {
    return this.profileService.getProfile(user);
  }

  @Get('orders')
  getOrders(@CurrentUser() user: AuthUser) {
    return this.profileService.getOrders(user);
  }

  @Post('orders')
  createOrder(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateProfileOrderDto,
  ) {
    return this.profileService.createOrder(user, dto);
  }

  @Patch()
  update(
    @CurrentUser() user: AuthUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(user, updateProfileDto);
  }

  @Patch('upload-profile')
  @UseInterceptors(FileInterceptor('avatar', multerOptions('avatar')))
  updateProfileImage(
    @CurrentUser() user: AuthUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.updateProfileImage(user, file);
  }
}
