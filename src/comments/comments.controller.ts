import { Controller, Delete, Get, Post, Put, Query, ParseIntPipe, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBody, ApiParam, ApiPayloadTooLargeResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateCommentDto, UpdateCommentDto } from './comments.dto';
import { log } from 'console';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor (private commentService: CommentsService) {}

  @Get('/')
  @ApiResponse({ status: 200, description: 'Get comments successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'postId', required: false })
  getComments(@Query('userId') userId: number, @Query('postId') postId: number) {
    const comments = this.commentService.getComments(userId, postId)
    return comments
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Get comment successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', required: true })
  getCommentById(@Param('id', ParseIntPipe) id: number) {
    const comment = this.commentService.getCommentById(id)
    return comment
  }

  @Post('/')
  @ApiResponse({ status: 201, description: 'Create comment successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ description: 'Create comment data', type: CreateCommentDto })
  createComment(@Body() data: CreateCommentDto) {
    const comment = this.commentService.createComment(data)
    return comment
  }
    

  @Put('/:id')
  @ApiResponse({ status: 200, description: 'Update comment successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ description: 'Update comment data', type: UpdateCommentDto})
  updateCommentById(@Param('id', ParseIntPipe) id: number, @Body() data: Prisma.CommentUpdateInput) {
    const comment = this.commentService.updateCommentById(id, data)
    console.log(comment)
    return comment
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Delete comment successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', required: true })
  deleteCommentById(@Param('id', ParseIntPipe) id: number) {
    const comment = this.commentService.deleteCommentById(id)
    return comment
  }
}
