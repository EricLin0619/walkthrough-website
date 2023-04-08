import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MembersModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
// the root module
