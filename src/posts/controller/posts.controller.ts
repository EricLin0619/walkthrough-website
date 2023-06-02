import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Query,
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
import { CreatePostDto, UpdatePostDto, AddTagsDto } from '../posts.dto';

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

  @Get('/:id')
  @ApiParam({ name: 'id', required: true, description: 'id of post' })
  @ApiResponse({ status: 200, description: 'Get posts successfully.' })
  @ApiResponse({ status: 404, description: 'Posts not found.' })
  getPostById(@Param('id', ParseIntPipe) id: number) {
    const result = this.postsService.getPostById(id);
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
  createPost(@Body() createPost: CreatePostDto) {
    const post = this.postsService.createPost(createPost);
    return post;
  }

  @Put('/:id')
  @ApiResponse({ status: 200, description: 'Update post successfully.' })
  @ApiParam({ name: 'id', required: true, description: 'id of post' })
  @ApiBody({ type: UpdatePostDto })
  updatePostById(
    @Body() updatePost: UpdatePostDto,
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

  @Put('/addTag/:id')
  @ApiResponse({ status: 200, description: 'Update post successfully.' })
  @ApiBody({ type: AddTagsDto })
  addTag(@Param('id', ParseIntPipe) id: number, @Body('tags') tags: AddTagsDto) {
    console.log(tags);
    const result = this.postsService.addTagToPost(id, tags);
    return result;
  }

  @Get('/comments/:id')
  @ApiResponse({ status: 200, description: 'Get comments successfully.' })
  @ApiResponse({ status: 404, description: 'Comments not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error.'})
  @ApiParam({ name: 'id', required: true, description: 'id of post' })
  getCommentsById(@Param('id', ParseIntPipe) id: number) {
    const result = this.postsService.getCommentsById(id);
    return result
  }
}
