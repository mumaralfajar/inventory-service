import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CreateInventoryDto } from 'src/dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(@InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const inventory = this.inventoryRepository.create(createInventoryDto);
    return this.inventoryRepository.save(inventory);
  }

  @RabbitSubscribe({
    exchange: 'order_exchange',
    routingKey: 'order.created',
    queue: 'inventory_queue',
  })
  async handleOrderCreated(msg: { productId: string; quantity: number }) {
    const inventory = await this.inventoryRepository.findOne({ where: { productId: msg.productId } });
    if (inventory) {
      inventory.stock -= msg.quantity;
      await this.inventoryRepository.save(inventory);
    }
    console.log(msg);
  }
}
