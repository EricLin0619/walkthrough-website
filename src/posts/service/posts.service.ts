import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User, Post } from '@prisma/client';
import { PostExistedError, PostsNotFoundError } from '../error';
import { CreatePostDto, AddTagsDto, UpdatePostDto } from '../posts.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) { }

  async getPosts(tags: Array<string>, postName) {
    const result = await this.prisma.post.findMany({
      include: {
        tags: true
      },
      where: {
        name: postName,
        tags: {
          some: {
            name: {
              in: tags
            }
          }
        }
      }
    })
    if (result.length === 0) {
      throw new PostsNotFoundError()
    }
    return result
  }

  async createPost(data: CreatePostDto) {
    const postExited = await this.prisma.post.findFirst({ where: { name: data.name } });
    if (postExited) {
      throw new PostExistedError()
    }

    const result = await this.prisma.post.create({
      data: {
        ...data,
        tags: {
          connect: {
            id: 1 // array of tags
          }
        }
      }
    });
    return result
  }

  async getPostById(id: number) {
    const result = await this.prisma.post.findFirst({ where: { id } });
    if (!result) {
      throw new PostsNotFoundError()
    }
    await this.addViews(id)
    return result
  }

  async updatePostById(id: number, data: UpdatePostDto) {
    const tagsData = data.tags.map(tag => {
      return {
        id: Number(tag)
      }
    })
    const result = await this.prisma.post.update({
      where: { id: id },
      data: {
        ...data,
        tags: {
          deleteMany: {},
          connect: tagsData
        }
      }
    });

    return result
  }

  async addTagToPost(id: number, tags) {
    const tagsData = tags.map(tag => {
      return {
        id: Number(tag)
      }
    })

    const result = await this.prisma.post.update({
      where: { id },
      data: {
        tags: {
          connect: tagsData
        }
      }
    }); 

    return result
  }

  async deletePostById(id: number) {
    const post = await this.prisma.post.findFirst({ where: { id } });
    if (!post) {
      throw new PostsNotFoundError()
    }

    const result = await this.prisma.post.delete({ where: { id } });
    return result
  }

  async addViews(id: number) {
    const result = await this.prisma.post.update({
      where: { id },
      data: {
        views: {
          increment: 1
        }
      }
    });
    return result
  }
}

// 52 if tag input is array
// 想要用關聯的做query但不想要屬性被顯示出來
// 93 need to delect specidied column