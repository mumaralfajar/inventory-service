import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Inventory } from './entities/inventory.entity';
import { InventoryGrpcService } from './services/inventory.grpc.service';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryService } from './services/inventory.service';
import { join } from 'path';
import { InventoryGrpcController } from './grpc/controllers/inventory.grpc.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'inventory_db',
      entities: [Inventory],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Inventory]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [{ name: 'order_exchange', type: 'topic' }],
      uri: 'amqp://guest:guest@localhost:5672',
    }),
  ],
  controllers: [InventoryController, InventoryGrpcController],
  providers: [
    InventoryService,
    {
      provide: 'INVENTORY_PACKAGE',
      useValue: {
        package: 'inventory',
        protoPath: join(__dirname, '../protos/inventory.proto'),
      },
    },
    InventoryGrpcService,
  ],
})
export class AppModule {}
