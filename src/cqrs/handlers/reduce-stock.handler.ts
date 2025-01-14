import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../../entities/inventory.entity';
import { ReduceStockCommand } from '../commands/reduce-stock.command';

@CommandHandler(ReduceStockCommand)
export class ReduceStockHandler implements ICommandHandler<ReduceStockCommand> {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async execute(command: ReduceStockCommand): Promise<void> {
    const { productId, quantity } = command;
    
    console.log(`[Inventory Command] Reducing stock for product ${productId} by ${quantity}`);
    
    const inventory = await this.inventoryRepository.findOne({
      where: { productId },
    });

    if (!inventory) {
      throw new Error(`Product ${productId} not found`);
    }

    inventory.stock -= quantity;
    await this.inventoryRepository.save(inventory);
    
    console.log(`[Inventory Command] Stock updated successfully`);
  }
}
