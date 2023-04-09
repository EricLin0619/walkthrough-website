import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'memberName',
      passwordField: 'password',
    });
  }

  async validate(memberName: string, password: string): Promise<any> {
    const user = await this.authService.validateMember(memberName, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}