import { Prisma, User } from "@prisma/client"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserByIdDto {
  @ApiProperty()
  name?: string

  @ApiProperty()
  is_admin?: boolean

  @ApiProperty()
  password?: string
}

export class CreateUserDto{
  @ApiProperty()
  name: string

  @ApiProperty()
  is_admin: boolean

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}
