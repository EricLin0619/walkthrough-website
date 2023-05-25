import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client';
import { UpdateUserByIdDto } from '../dto/user.dto';
import { UserNotFoundError, UserExistedError } from '../error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(name: string, email: string, is_admin: any) {
    if (is_admin === 'true') is_admin = true
    else if (is_admin === 'false') is_admin = false
    
    const users = await this.prisma.user.findMany({ where: { name: { contains: name }, email: { contains: email }, is_admin }})
    if (!users) {
      throw new UserNotFoundError()
    }
    return users
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new UserNotFoundError()
    }
    return user
  }

  async getUserByName(name: string) {
    const user = await this.prisma.user.findFirst({ where: { name } })
    if (!user) {
      throw new UserNotFoundError()
    }
    return user
  }

  async createUser(user: Prisma.UserCreateInput) {
    const userExist = await this.prisma.user.findFirst({where: {email: user.email}})
    if (userExist){
      throw new UserExistedError()
    }
    user.password = await bcrypt.hash(user.password, 10)
    const result = await this.prisma.user.create({data: user})
    return result
  }

  async updateUserById(id: number, user: UpdateUserByIdDto) {
    const result = await this.prisma.user.update({
      where:{ id },
      data: { name: user.name,
              is_admin: user.is_admin,
              password: user.password,
      }
    })
    return result
  }

  async deleteUserById(id: number) {
    const result = this.prisma.user.delete({ where: { id } })
    return result
  }
}
