import { Module } from '@nestjs/common';
import { MembersController } from './controller/members.controller';
import { MembersService } from './service/members.service';
import { PrismaService } from '../prisma/prisma.service' 

@Module({
  controllers: [MembersController],
  providers: [MembersService, PrismaService],
  exports: [MembersService]
})
export class MembersModule {}
