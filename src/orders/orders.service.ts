import { Injectable, Inject } from '@nestjs/common';
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

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Method 1: Direct service call
    const user = await this.usersService.findOne(createOrderDto.userId);
    
    // Method 2: Microservice call (as an alternative)
    // const user = await firstValueFrom(
    //   this.usersClient.send({ cmd: 'get_user_by_id' }, createOrderDto.userId)
    // );
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }
}