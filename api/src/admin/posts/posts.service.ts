import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadsService } from 'src/uploads/uploads.service';
import { AuthUser } from 'src/common/types/auth-user.type';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadsService: UploadsService,
  ) {}

  async create(
    user: AuthUser,
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
  ) {
    const postExist = await this.prisma.post.findFirst({
      where: { slug: createPostDto.slug, isDeleted: false },
    });

    if (postExist)
      throw new ConflictException('این اسلاگ وجود دارد برای پس دیگر .');

    const uploaded = file?.path
      ? await this.uploadsService.upload(file, 'posts')
      : undefined;
    const imageUrl = uploaded?.url ?? createPostDto.image;
    if (!imageUrl)
      throw new ConflictException('برای مقاله باید تصویر انتخاب کنید.');
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        image: imageUrl,
        authorId: user.id,
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
        excerpt: true,
        image: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findFirst({
      where: { id, isDeleted: false },
    });

    if (!post) throw new NotFoundException('پست با این مشخصات پیدا نشد.');
    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    file: Express.Multer.File,
  ) {
    const postExist = await this.prisma.post.findFirst({
      where: { id, isDeleted: false },
    });

    if (!postExist) throw new NotFoundException('پست مورد نظر پیدا نشد.');

    if (
      updatePostDto.slug &&
      updatePostDto.slug !== postExist.slug &&
      (await this.prisma.post.findUnique({
        where: { slug: updatePostDto.slug },
      }))
    ) {
      throw new ConflictException('این اسلاگ برای مقاله دیگری استفاده شده است.');
    }

    const image = file?.path
      ? await this.uploadsService.upload(file, 'posts')
      : undefined;
    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        image: image?.url ?? updatePostDto.image,
      },
    });
  }

  async remove(id: string) {
    const postExist = await this.prisma.post.findFirst({
      where: { id: id, isDeleted: false },
    });

    if (!postExist) throw new NotFoundException('پست مورد نظر پیدا نشد.');
    return await this.prisma.post.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
