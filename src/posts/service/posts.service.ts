import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User, Post } from '@prisma/client';
import { PostExistedError, PostsNotFoundError } from '../error';
import { CreatePostDto } from '../posts.dto';

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

  async getPostsByUserId(id: number) {
    const result = await this.prisma.post.findMany({ where: { authorId: 1 } });

    if (result.length === 0) {
      throw new PostsNotFoundError()
    }
    return result;
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
    return result
  }

  async updatePostById(id: number, data: Prisma.PostUpdateInput) {
    const result = await this.prisma.post.update({
      where: { id },
      data: {
        ...data,
        tags: {
          connect: {
            id: 5 
          }
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

  async deletePostByName(name: string) {
    const post = await this.prisma.post.findFirst({ where: { name } });
    if (!post) {
      throw new PostsNotFoundError()
    }

    const result = await this.deletePostById(post.id);
    return result
  }

  async getFavoritePostByUserId(userId: number) {
    const result = await this.prisma.post.findMany({
      include: {
        favoriteusers: true
      },
      where: {
        favoriteusers: {
          some: {
            userId
          }
        },
      }
    });
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
// 93 need to delect specidied column