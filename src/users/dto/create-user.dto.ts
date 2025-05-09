import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, Min, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe'
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@example.com'
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'The age of the user',
    example: 30,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  readonly age: number;
}