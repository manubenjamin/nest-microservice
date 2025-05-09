import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private usersService: UsersService,
    @Inject('USERS_SERVICE') private usersClient: ClientProxy,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    
    return order;
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: ['user'],
    });
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Method 1: Direct service call
    const user = await this.usersService.findOne(createOrderDto.userId);
    
    if (!user) {
      throw new NotFoundException(`User with ID "${createOrderDto.userId}" not found`);
    }
    
    // Method 2: Alternative microservice call
    // Uncomment if you want to use microservice communication instead
    // const user = await firstValueFrom(
    //   this.usersClient.send({ cmd: 'get_user_by_id' }, createOrderDto.userId)
    // );
    // 
    // if (!user) {
    //   throw new NotFoundException(`User with ID "${createOrderDto.userId}" not found`);
    // }
    
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }
}