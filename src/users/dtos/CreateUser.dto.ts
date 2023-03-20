import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  age: number;
}
