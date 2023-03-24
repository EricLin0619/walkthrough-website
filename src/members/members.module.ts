import { Module } from '@nestjs/common';
import { MembersController } from './controller/members.controller';
import { MembersService } from './service/members.service';

@Module({
  controllers: [MembersController],
  providers: [MembersService]
})
export class MembersModule {}
