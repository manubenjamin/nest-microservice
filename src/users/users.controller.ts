import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // HTTP endpoints
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ 
    status: 200, 
    description: 'The list of all users',
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'The user with the specified ID',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
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
  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}