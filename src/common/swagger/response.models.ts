import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;
}

export class PaginatedResponse<T> extends BaseResponse {
  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ type: 'array', isArray: true })
  data: T[];
}

export class ErrorResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;
  
  @ApiProperty({ example: 'Bad Request' })
  error: string;
  
  @ApiProperty({ example: 'Invalid input data' })
  message: string;
}