import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UploadsService } from 'src/uploads/uploads.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UploadsService],
})
export class UsersModule {}
