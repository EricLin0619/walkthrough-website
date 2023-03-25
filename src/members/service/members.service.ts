import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client';
import { UpdateMemberByIdDto } from '../dto/member.dto';
import { MemberNotFound } from '../../utils/error';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async getAllMembers() {
    const users = await this.prisma.member.findMany()
    return users
  }

  async getMemberById(id: string) {
    const user = await this.prisma.member.findUniqueOrThrow({where: { id: Number(id) }})
    return user
  }

  async getMemberByName(name: string) {
    const user = await this.prisma.member.findFirstOrThrow({ where: { name } })
    // if (!user) {
    //   throw new MemberNotFound('member not found')
    // }
    return user
  }

  async createMember(member: Prisma.MemberCreateInput) {
    const user = await this.prisma.member.create({data: member})
    return user
  }

  async updateMemberById(id:string, member: UpdateMemberByIdDto) {
    const user = await this.prisma.member.update({
      where:{ id: Number(id) },
      data: { name: member.name,
              is_admin: member.is_admin,
              password: member.password,
      }
    })
    return user
  }

  async deleteMemberById(id: string) {
    const result = this.prisma.member.delete({ where: { id: Number(id) } })
    return result
  }
}
