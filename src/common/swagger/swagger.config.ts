import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('NestJS Microservices API')
    .setDescription('API documentation for NestJS Microservices application')
    .setVersion('1.0')
    .addTag('users')
    .addTag('orders')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}