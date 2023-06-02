import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CommentsNotFoundError,
  PostExistedError,
  PostsNotFoundError,
} from '../error';
import { CreatePostDto, UpdatePostDto } from '../posts.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getPosts(tags: Array<string>, postName) {
    const result = await this.prisma.post.findMany({
      include: {
        tags: true,
      },
      where: {
        name: postName,
        tags: {
          some: {
            name: {
              in: tags,
            },
          },
        },
      },
    });
    if (result.length === 0) {
      throw new PostsNotFoundError();
    }
    return result;
  }

  async createPost(data: CreatePostDto) {
    const postExited = await this.prisma.post.findFirst({
      where: { name: data.name },
    });
    if (postExited) {
      throw new PostExistedError();
    }

    const tagsData = data.tags.map((tag) => {
      return {
        where: { name: tag },
        create: { name: tag }
      };
    });

    const result = await this.prisma.post.create({
      data: {
        ...data,
        tags: {
          connectOrCreate: tagsData
        },
      },
    });
    return result;
  }

  async getPostById(id: number) {
    const result = await this.prisma.post.findFirst({ where: { id } });
    if (!result) {
      throw new PostsNotFoundError();
    }
    await this.addViews(id);
    return result;
  }

  async updatePostById(id: number, data: UpdatePostDto) {
    const post = await this.prisma.post.findFirst({ where: { id } });
    if (!post) {
      throw new PostsNotFoundError();
    }
    
    const tagsData = data.tags.map((tag) => {
      return {
        where: { name: tag },
        create: { name: tag }
      };
    });
    const result = await this.prisma.post.update({
      where: { id },
      data: {
        ...data,
        tags: {
          deleteMany: {},
          connectOrCreate: tagsData,
        },
      },
    });

    return result;
  }

  async addTagToPost(id: number, tags) {
    const post = await this.prisma.post.findFirst({ where: { id } })
    if (!post) {
      throw new PostsNotFoundError();
    }

    const tagsData = tags.map((tag) => {
      return {
        id: Number(tag),
      };
    });

    const result = await this.prisma.post.update({
      where: { id },
      data: {
        tags: {
          connect: tagsData,
        },
      },
    });

    return result;
  }

  async deletePostById(id: number) {
    const post = await this.prisma.post.findFirst({ where: { id } });
    if (!post) {
      throw new PostsNotFoundError();
    }

    const result = await this.prisma.post.delete({ where: { id } });
    return result;
  }

  async addViews(id: number) {
    const result = await this.prisma.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return result;
  }

  async getCommentsById(id: number) {
    const result = await this.prisma.comment.findMany({
      where: {
        postId: id,
      },
      select: {
        id: true,
        body: true,
      },
    });

    if (result.length === 0) {
      throw new CommentsNotFoundError();
    }
    return result;
  }
}

// 52 if tag input is array
// 想要用關聯的做query但不想要屬性被顯示出來
// 93 need to delect specidied column
