import { Module } from '@nestjs/common';
import Joi from 'joi';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './admin/posts/posts.module';
import { UsersModule } from './admin/users/users.module';
import { CategoriesModule } from './admin/categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProductsModule } from './admin/products/products.module';
import { FaqModule } from './admin/faq/faq.module';

@Module({
  imports: [
    PrismaModule,
    BlogModule,
    PostsModule,
    UsersModule,
    CategoriesModule,
    ProfileModule,
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 20 }],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),

        PORT: Joi.number().default(3000),

        DATABASE_URL: Joi.string().required(),

        JWT_ACCESS_SECRET: Joi.string().min(32).required(),

        JWT_REFRESH_SECRET: Joi.string().min(32).required(),

        JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),

        JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
      }),
    }),
    ProductsModule,
    FaqModule,
  ],
})
export class AppModule {}
