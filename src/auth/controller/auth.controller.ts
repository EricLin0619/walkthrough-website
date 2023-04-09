import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
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
  @ApiResponse({ status: 201, description: 'The member has been successfully logged in.'})
  async login(@Body() loginData: LoginDto) {
    return this.authservice.login(loginData);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test() {
    return 'test'
  }
}
