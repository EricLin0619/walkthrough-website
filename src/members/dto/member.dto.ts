import { Prisma, Member } from "@prisma/client"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateMemberByIdDto {
  @ApiProperty()
  name?: string

  @ApiProperty()
  is_admin?: boolean

  @ApiProperty()
  password?: string
}

export class CreateMemberDto{
  @ApiProperty()
  name: string

  @ApiProperty()
  is_admin: boolean

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}
