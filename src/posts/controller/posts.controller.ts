import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags,  } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {

  @Get()
  getAllPosts() {

  }

  @Get()
  getPostsByTags() {

  }

  @Get()
  getPostById() {

  }

  @Get()
  getPostByName() {

  }

  @Get()
  getFavoritePostByUserId() {

  }

  @Get()
  getPostByUserId() {

  }

  @Get()
  getViewsByPostId() {

  }

  @Post()
  createPost() {

  }

  @Put()
  updatePostById() {

  }

  @Put()
  updatePostByName() {

  }

  @Delete()
  deletePostById() {

  }

  @Delete()
  deletePostByName() {

  }
}
