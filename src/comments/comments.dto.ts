import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  body: string;
}

export class UpdateCommentDto {
  @ApiProperty()
  body: string;
}