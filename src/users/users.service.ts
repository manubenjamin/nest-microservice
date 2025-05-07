import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: any) {
    const newUser = {
      id: Date.now().toString(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
}
