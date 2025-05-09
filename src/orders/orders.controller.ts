import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Returns all orders',
    type: [Order],
  })
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({
    name: 'id',
    description: 'Order ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the order with the specified ID',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @ApiOperation({ summary: 'Get orders by user ID' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all orders for the specified user',
    type: [Order],
  })
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.ordersService.findByUser(userId);
  }

  // Microservice message patterns
  @MessagePattern({ cmd: 'get_orders' })
  getAllOrders() {
    return this.ordersService.findAll();
  }

  @MessagePattern({ cmd: 'get_order_by_id' })
  getOrderById(id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_orders_by_user' })
  getOrdersByUser(userId: string) {
    return this.ordersService.findByUser(userId);
  }

  @MessagePattern({ cmd: 'create_order' })
  createOrder(createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }
}