import { Module, Global } from '@nestjs/common';
import { UsersModule } from './members/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { CommentsModule } from './comments/comments.module';

@Global()
@Module({
  imports: [UsersModule, PrismaModule, AuthModule, PostsModule, TagsModule, CommentsModule],
  controllers: [],
  providers: [],
  exports: [PrismaModule],
})
export class AppModule {}
// the root module
