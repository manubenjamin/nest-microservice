import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityDto } from '../../common/dto/base.dto';

export class UserResponseDto extends BaseEntityDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe'
  })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'The age of the user',
    example: 30
  })
  age: number;
}