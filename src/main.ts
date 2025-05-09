import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { setupSwagger } from './common/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  // Connect to microservices
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });
  
  // Set up Swagger
  setupSwagger(app);
  
  // Start microservices
  await app.startAllMicroservices();
  
  // Start HTTP server
  await app.listen(3000);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation is available at: ${await app.getUrl()}/api-docs`);
}
bootstrap();