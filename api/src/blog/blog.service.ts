import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(paginationQueryDto: PaginationQueryDto) {
    // where query for search
    const where = paginationQueryDto.search
      ? {
          OR: [
            {
              title: {
                contains: paginationQueryDto.search,
                mode: 'insensitive' as const,
              },
            },
            {
              content: {
                contains: paginationQueryDto.search,
                mode: 'insensitive' as const,
              },
            },
          ],
        }
      : undefined;

    const [posts, total] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        // sort
        orderBy: {
          createdAt: paginationQueryDto.orderBy,
        },
        // pagination
        skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
        take: paginationQueryDto.limit,
        //search query
        where: where,
      }),

      this.prisma.post.count({
        where: where,
      }),
    ]);

    return {
      data: posts,
      totalCount: total,
      page: paginationQueryDto.page,
      limit: paginationQueryDto.limit,
      totalPages: Math.ceil(total / paginationQueryDto.limit),
    };
  }

  async findOne(slug: string) {
    const blog = await this.prisma.post.findUnique({
      where: { slug },
    });

    if (!blog) throw new NotFoundException('پستی با این مشخصات پیدا نشد');
    return blog;
  }
}
