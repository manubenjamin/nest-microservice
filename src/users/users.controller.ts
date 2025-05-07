import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // HTTP endpoints
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  // Microservice message patterns
  @MessagePattern({ cmd: 'get_users' })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  getUserById(id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  createUser(createUserDto: any) {
    return this.usersService.create(createUserDto);
  }
}
