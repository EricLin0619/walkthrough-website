import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { MembersService } from '../service/members.service';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService){}

  @Get('getAllUsers')
  getAllUsers() {
    const users = this.membersService.getAllUsers
    return users
  }

  @Get('getUserById')
  getUserById() {
    
  }

  @Post('createUser')
  createUser() {

  }

  @Patch('updateUserById')
  updateUserById() {

  }

  @Delete('deleteUserById')
  deleteUserById() {

  }
}
