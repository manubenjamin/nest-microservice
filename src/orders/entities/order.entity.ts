import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Order {
  @ApiProperty({
    description: 'The unique identifier of the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The ID of the user who placed the order',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @Column()
  userId: string;

  @ApiProperty({
    description: 'The user who placed the order',
    type: () => User,
  })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    description: 'List of items in the order',
    example: ['Item 1', 'Item 2'],
    isArray: true,
  })
  @Column('simple-array')
  items: string[];

  @ApiProperty({
    description: 'Total amount of the order',
    example: 99.99,
  })
  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ApiProperty({
    description: 'The timestamp when the order was created',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;
}