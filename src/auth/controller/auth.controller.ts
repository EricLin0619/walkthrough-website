import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard, LocalAuthGuard } from '../guard/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from '../auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully logged in.'})
  async login( @Request() req ) {
    return this.authservice.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile( @Request() req ) {
    // console.log(req)
    return req.user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test() {
    return 'test'
  }
}
