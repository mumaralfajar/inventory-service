import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Inventory } from './entities/inventory.entity';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryService } from './services/inventory.service';
import { InventoryGrpcController } from './grpc/controllers/inventory.grpc.controller';

// CQRS Handlers
import { ReduceStockHandler } from './cqrs/handlers/reduce-stock.handler';
import { GetStockHandler } from './cqrs/handlers/get-stock.handler';
import { CreateInventoryHandler } from './cqrs/handlers/create-inventory.handler';

const CommandHandlers = [ReduceStockHandler, CreateInventoryHandler];
const QueryHandlers = [GetStockHandler];

@Module({
  imports: [
    CqrsModule,
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
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class AppModule {}
