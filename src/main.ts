import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  // Create HTTP application
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();

  // Connect microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'inventory',
      protoPath: join(__dirname, '../protos/inventory.proto'),
    },
  });

  // Start all services
  await app.startAllMicroservices();
  await app.listen(3000);

  console.log('Inventory service is running');
  console.log('HTTP on: http://localhost:3000');
  console.log('gRPC on: 0.0.0.0:50051');
}

bootstrap();
