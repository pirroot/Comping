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

    const image = await this.uploadsService.upload(file, 'posts');

    return await this.prisma.post.create({
      data: {
        ...createPostDto,
        image: image.url,
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
        image: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });

    if (!post) throw new NotFoundException('پست با این مشخصات پیدا نشد.');
    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    file: Express.Multer.File,
  ) {
    const postExist = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!postExist) throw new NotFoundException('پست مورد نظر پیدا نشد.');

    let imageFile = postExist.image;
    if (postExist.image && file.path) {
      await this.uploadsService.delete(imageFile);
      const image = await this.uploadsService.upload(file, 'posts');
      imageFile = image.url;
    }

    return await this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        image: imageFile,
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
