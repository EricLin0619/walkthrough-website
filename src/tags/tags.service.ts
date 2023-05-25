import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { TagsNotFoundError } from './error';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async getTags() {
    const result = await this.prisma.tag.findMany()
    if (result.length === 0) {
      throw new TagsNotFoundError()
    }
    return result
  }

  async createTag(data: Prisma.TagCreateInput) {
    const result = await this.prisma.tag.create({
      data
    })
    return result
  }

  async deleteTag(id: number) {
    const tag = await this.prisma.tag.findFirst({ where: { id } })
    if (!tag) {
      throw new TagsNotFoundError()
    }
    
    const result = await this.prisma.tag.delete({
      where: { id }
    })
    return result
  }
}
