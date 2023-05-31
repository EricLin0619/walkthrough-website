import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor( private prismaService: PrismaService ) {}

  async getComments(userId: number, postId: number) {
    if (userId && postId) {
      const comments = await this.prismaService.comment.findMany({
        where: {
          userId,
          postId
        }
      })
      return comments
    }

    else if (!userId && postId) {
      const comments = await this.prismaService.comment.findMany({
        where: {
          postId
        }
      })
      return comments
    }

    else if (userId && !postId) {
      const comments = await this.prismaService.comment.findMany({
        where: {
          userId
        }
      })
      return comments
    }

    else {
      const comments = await this.prismaService.comment.findMany({
        where: {
          userId,
          postId
        }
      })
      return comments
    }
  }

  async getCommentById(id: number) {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id
      }
    })

    return comment
  }

  async createComment(commentData: CreateCommentDto) {
    const comment = await this.prismaService.comment.create({
      data: {
        body: commentData.body,
        user: {
          connect: {
            id: commentData.userId
          }
        },
        post: {
          connect: {
            id: commentData.postId
          }
        }
      }
    })

    return comment
  }

  async updateCommentById(id: number, data: Prisma.CommentUpdateInput) {
    const comment = await this.prismaService.comment.update({
      where: {
        id
      },
      data
    })

    return comment
  }

  async deleteCommentById(id: number) {
    const comment = await this.prismaService.comment.delete({
      where: {
        id
      }
    })

    return comment
  }
}
