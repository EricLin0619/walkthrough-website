import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserByIdDto } from '../dto/user.dto';
import { Prisma } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get('/')
  @ApiResponse({ status: 200, description: 'Get users successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 404, description: 'Users Not Found .'})
  @ApiQuery({ name: 'name', required: false, description: 'name of user' })
  @ApiQuery({ name: 'eamil', required: false, description: 'eamil of user' })
  @ApiQuery({ name: 'is_admin', required: false, description: 'is_admin of user' })
  getAllusers(
    @Query('name') name: string,
    @Query('eamil') eamil: string,
    @Query('is_admin') is_admin: boolean, 
  ) {
    const users = this.usersService.getUsers(name, eamil, is_admin)
    return users
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get user successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 404, description: 'User Not Found .'})
  getuserById(@Param('id', ParseIntPipe) id: number ) {
    const user = this.usersService.getUserById(id)
    return user
  }

  @Get('/posts/:id')
  @ApiResponse({ status: 200, description: 'Get posts successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 404, description: 'Post Not Found .'})
  @ApiParam({ name: 'id', required: true, description: 'id of user' })
  getPostsById(@Param('id', ParseIntPipe) id: number) {
    const posts = this.usersService.getPostsByUserId(id)
    return posts
  }

  @Get('/favorite/:id')
  @ApiResponse({ status: 200, description: 'Get favorite posts successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 404, description: 'Favorite posts Not Found .'})
  getFavoritePostsById(@Param('id', ParseIntPipe) id: number) {
    const posts = this.usersService.getFavoritePostsByUserId(id)
    return posts
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
  updateuserById(@Body() User: UpdateUserByIdDto, @Param('id', ParseIntPipe) id: number ) {
    const user = this.usersService.updateUserById(id, User)
    return user
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'The user has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  deleteuserById(@Param('id', ParseIntPipe) id: number) {
    const result = this.usersService.deleteUserById(id)
    return result
  }
}
