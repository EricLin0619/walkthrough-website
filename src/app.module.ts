import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { Controller } from './src/posts/controller/.controller';

@Module({
  imports: [MembersModule, PrismaModule, PostsModule],
  controllers: [Controller],
  providers: [],
})
export class AppModule {}
// the root module
