import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service' 

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.member.findMany()
    return users
  }

  async getUserById(id: number) {
    const user = await this.prisma.member.findUnique({where: {id}})
    return user
  }
}
