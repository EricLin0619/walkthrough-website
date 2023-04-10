import { Module, Global } from '@nestjs/common';
import { UsersModule } from './members/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [UsersModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
  exports: [PrismaModule],
})
export class AppModule {}
// the root module
