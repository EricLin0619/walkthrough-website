import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { ValidateCreateUserPipe } from '../../pipes/validate-create-user/validate-create-user.pipe';

@Controller('users') // api or route
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('query') // decorators are basically just functions
  getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
    console.log(sortDesc);
    return { username: 'Eric', email: 'eric@eric.com' };
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log(userData.email);
    console.log(userData.username);
    this.userService.createUser(userData);
    return { ...userData };
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Get()
  getUserByService() {
    console.log('controller');
    return this.userService.fetchUsers();
  }
}
