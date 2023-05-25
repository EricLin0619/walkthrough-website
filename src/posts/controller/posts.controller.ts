import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Query,
  ParseArrayPipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostsService } from '../service/posts.service';
import { CreatePostDto, updatePostDto } from '../posts.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/')
  @ApiQuery({
    name: 'tags',
    required: false,
    description: 'tags of post',
    isArray: true,
    type: String,
  })
  @ApiQuery({ name: 'name', required: false, description: 'name of post' })
  @ApiResponse({ status: 200, description: 'Get posts successfully.' })
  @ApiResponse({ status: 404, description: 'Posts not found.' })
  getAllPosts(
    @Query('tags') tags: Array<string>,
    @Query('name') postName: string,
  ) {
    const posts = this.postsService.getPosts(tags, postName);
    return posts;
  }

  @Get('/id/:id')
  @ApiParam({ name: 'id', required: true, description: 'id of post' })
  @ApiResponse({ status: 200, description: 'Get posts successfully.' })
  @ApiResponse({ status: 404, description: 'Posts not found.' })
  getPostById(@Param('id', ParseIntPipe) id: number) {
    const result = this.postsService.getPostById(id);
    return result;
  }

  @Get('/favorite/:userId')
  @ApiResponse({ status: 200, description: 'Get posts successfully.' })
  @ApiResponse({ status: 404, description: 'Posts not found.' })
  @ApiParam({ name: 'userId', required: true, description: 'user id' })
  getFavoritePostByUserId(@Param('userId', ParseIntPipe) userId: number) {
    const result = this.postsService.getFavoritePostByUserId(userId);
    return result;
  }

  @Get('/user/:id')
  @ApiResponse({ status: 200, description: 'Get posts successfully.' })
  @ApiResponse({ status: 404, description: 'Posts not found.' })
  getPostByUserId(@Param('id') id: number) {
    const result = this.postsService.getPostsByUserId(id);
    return result;
  }

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 409, description: 'Post has existed.' })
  @ApiBody({ type: CreatePostDto })
  createPost(@Body() createPost: CreatePostDto, tags: Array<string>) {
    const post = this.postsService.createPost(createPost);
    return post;
  }

  @Put('/:id')
  @ApiResponse({ status: 200, description: 'Update post successfully.' })
  @ApiParam({ name: 'id', required: true, description: 'id of post' })
  @ApiBody({ type: CreatePostDto })
  updatePostById(
    @Body() updatePost: updatePostDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    const result = this.postsService.updatePostById(id, updatePost);
    return result;
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Delete post successfully.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', required: true, description: 'id of post' })
  deletePostById(@Param('id', ParseIntPipe) id: number) {
    const result = this.postsService.deletePostById(id);
    return result;
  }

  @Delete('/name')
  @ApiResponse({ status: 200, description: 'Delete post successfully.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({ name: 'name', required: true, description: 'name of post' })
  deletePostByName(@Query('name') name: string) {
    const result = this.postsService.deletePostByName(name);
    return result;
  }

  @Put('/addViews/:id')
  @ApiResponse({ status: 200, description: 'Update post successfully.' })
  @ApiParam({ name: 'id', required: true, description: 'id of post' })
  addViews(@Param('id', ParseIntPipe) id: number) {
    const result = this.postsService.addViews(id);
    return result;
  }
}
