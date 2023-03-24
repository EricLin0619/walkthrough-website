import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MembersModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
// the root module
