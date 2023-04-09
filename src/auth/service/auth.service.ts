import { Injectable } from '@nestjs/common';
import { MembersService } from '../../members/service/members.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private membersService: MembersService,
              private jwtService: JwtService
    ) {}

  async validateMember(memberName: string, password: string): Promise<any> {
    const member = await this.membersService.getMemberByName(memberName);
    if (member && member.password === password) {
      const { password, ...result } = member;
      return result;
    }
    return null;
  }

  async login(member: any) {
    const payload = { username: member.name, sub: member.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

