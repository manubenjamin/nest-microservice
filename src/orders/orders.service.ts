import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(@Inject('USERS_SERVICE') private usersClient: ClientProxy) {}

  async createOrder(createOrderDto: any) {
    // Verify user exists before creating order
    const user = await firstValueFrom(
      this.usersClient.send({ cmd: 'get_user_by_id' }, createOrderDto.userId),
    );

    if (!user) {
      throw new Error('User not found');
    }

    // If user exists, create the order
    return {
      id: Date.now().toString(),
      ...createOrderDto,
      createdAt: new Date(),
    };
  }
}
