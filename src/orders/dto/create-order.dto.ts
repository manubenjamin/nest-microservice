import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the user who is placing the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({
    description: 'List of items in the order',
    example: ['Item 1', 'Item 2'],
    type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  readonly items: string[];

  @ApiProperty({
    description: 'Total amount of the order',
    example: 99.99,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  readonly total: number;
}