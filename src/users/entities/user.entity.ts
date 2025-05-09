import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'The age of the user',
    example: 30,
  })
  @Column()
  age: number;

  @ApiProperty({
    description: 'The timestamp when the user was created',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the user was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}