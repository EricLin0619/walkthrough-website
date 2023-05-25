import { Controller, Delete, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateTagDto } from './tags.dto';
import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get('/')
  @ApiResponse({ status: 200, description: 'Get tags successfully.' })
  @ApiResponse({ status: 404, description: 'Tags not found.' })
  getTags() {
    const result = this.tagsService.getTags();
    return result;
  }

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateTagDto })
  createTag(@Body() data: Prisma.TagCreateInput) {
    const result = this.tagsService.createTag(data);
    return result;
  }

  @Delete('/:id')
  @ApiResponse({ status: 204, description: 'Delete tag successfully.' })
  @ApiResponse({ status: 404, description: 'Tag not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', required: true, description: 'tag id' })
  deleteTag(@Param('id', ParseIntPipe) id: number) {
    const result = this.tagsService.deleteTag(id);
    return result;
  }
}
