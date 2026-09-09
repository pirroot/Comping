import { Controller, Get, Param, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dto/update-user.dto';

@Controller('admin/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Patch(':username')
  update(@Param('username') username: string, userUpdateDto: UserUpdateDto) {
    return this.usersService.update(username, userUpdateDto);
  }

  @Patch(':id')
  BanUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
