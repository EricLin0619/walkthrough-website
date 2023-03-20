import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log(metadata);
    console.log(value);
    console.log('pipe test');
    value.age = Number(value.age);
    return value;
  }
}
