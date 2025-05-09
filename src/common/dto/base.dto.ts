import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDate, IsOptional } from 'class-validator';

export class BaseEntityDto {
  @ApiProperty({
    description: 'Unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-01-01T00:00:00Z'
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-01-01T00:00:00Z'
  })
  @IsDate()
  updatedAt: Date;
}

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Page number (1-based)',
    example: 1,
    default: 1,
    required: false
  })
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: 'Items per page',
    example: 10,
    default: 10,
    required: false
  })
  @IsOptional()
  limit?: number = 10;
}