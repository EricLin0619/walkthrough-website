import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client';
import { UpdateUserByIdDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany()
    return users
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({where: { id: Number(id) }})
    return user
  }

  async getUserByName(name: string) {
    const user = await this.prisma.user.findFirstOrThrow({ where: { name } })
    // if (!user) {
    //   throw new userNotFound('user not found')
    // }
    return user
  }

  async createUser(user: Prisma.UserCreateInput) {
    const result = await this.prisma.user.create({data: user})
    return result
  }

  async updateUserById(id: string, user: UpdateUserByIdDto) {
    const result = await this.prisma.user.update({
      where:{ id: Number(id) },
      data: { name: user.name,
              is_admin: user.is_admin,
              password: user.password,
      }
    })
    return result
  }

  async deleteUserById(id: string) {
    const result = this.prisma.user.delete({ where: { id: Number(id) } })
    return result
  }
}
