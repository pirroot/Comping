import {
  Controller,
  Get,
  Logger,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger/logger.interceptor';

@UseInterceptors(LoggerInterceptor)
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.blogService.findAll(paginationQueryDto);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.blogService.findOne(slug);
  }
}
