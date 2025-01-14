import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CommandBus } from '@nestjs/cqrs';
import { ReduceStockCommand } from '../cqrs/commands/reduce-stock.command';

interface OrderCreatedEvent {
  orderId: string;
  productId: string;
  quantity: number;
}

@Injectable()
export class InventoryService {
  constructor(private readonly commandBus: CommandBus) {}

  @RabbitSubscribe({
    exchange: 'order_exchange',
    routingKey: 'order.created',
    queue: 'inventory-order-created',
  })
  async handleOrderCreated(data: OrderCreatedEvent) {
    console.log('[Inventory Service] Received order.created event:', data);
    
    await this.commandBus.execute(
      new ReduceStockCommand(data.productId, data.quantity)
    );
    
    console.log('[Inventory Service] Stock reduced successfully');
  }
}
