import { Injectable } from '@nestjs/common';
import { CreateUserType } from '../../../utils/type';

@Injectable() // every provider must have injectable decorator
export class UsersService {
  private fakeUsers = [{ username: 'Eric', email: 'eric@eric.com' }];
  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
  }

  fetchUserById(id: number) {
    return this.fakeUsers[id - 1];
  }
}
