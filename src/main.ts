import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'; // Add this specific import

async function bootstrap() {
  // Create the main HTTP application
  const app = await NestFactory.create(AppModule);

  // Connect the same application instance to microservices transport
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });

  // Start all microservices and then the HTTP server
  await app.startAllMicroservices();
  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Microservice is listening on port: 3001`);
}
bootstrap();
