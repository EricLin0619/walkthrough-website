import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Post } from '@prisma/client';

export class CreatePostDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  body: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  views: number;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  tags?: Array<string>;
}

export class UpdatePostDto extends CreatePostDto {
  @ApiProperty()
  tags: Array<string>;
}

export class AddTagsDto {
  @ApiProperty()
  tags: Array<string>;
}