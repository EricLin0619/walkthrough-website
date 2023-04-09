import { ApiProperty} from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty()
  memberName: string;

  @ApiProperty()
  password: string;
}