import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserByIdDto } from '../dto/user.dto';
import { Prisma } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get('/')
  @ApiResponse({ status: 200, description: 'Get users successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  getAllusers() {
    const users = this.usersService.getAllUsers()
    return users
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get user successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  getuserById(@Param('id') id: string ) {
    const user = this.usersService.getUserById(id)
    return user
  }

  @Get(':name')
  @ApiResponse({ status: 200, description: 'Get user successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  getuserByName(@Param('name') name: string ) {
    const user = this.usersService.getUserByName(name)
    return user
  }

  @Post('/')
  @ApiBody({ type: CreateUserDto  })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  createuser(@Body() createuser: Prisma.UserCreateInput) {
    const user = this.usersService.createUser(createuser)
  }

  @Put(':id')
  @ApiBody({ type: UpdateUserByIdDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  updateuserById(@Body() User: UpdateUserByIdDto, @Param('id') id: string ) {
    const user = this.usersService.updateUserById(id, User)
    return user
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'The user has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  deleteuserById(@Param('id') id: string) {
    const result = this.usersService.deleteUserById(id)
    return result
  }
}
