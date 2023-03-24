import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaClient) {}

  async getAllUsers() {
    const users = await this.prisma.member.findMany()
    return users
  }

  async getUserById(id: number) {
    const user = await this.prisma.member.findUnique({where: {id}})
    return user
  }
}
