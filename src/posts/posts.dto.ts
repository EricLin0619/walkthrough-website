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
}

export class updatePostDto extends CreatePostDto {}