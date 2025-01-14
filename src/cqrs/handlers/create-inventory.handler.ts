import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../../entities/inventory.entity';
import { CreateInventoryCommand } from '../commands/create-inventory.command';

@CommandHandler(CreateInventoryCommand)
export class CreateInventoryHandler implements ICommandHandler<CreateInventoryCommand> {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async execute(command: CreateInventoryCommand): Promise<Inventory> {
    const { productId, stock } = command;
    
    console.log(`[Inventory Command] Creating inventory for product ${productId} with stock ${stock}`);
    
    const inventory = this.inventoryRepository.create({
      productId,
      stock,
    });

    const savedInventory = await this.inventoryRepository.save(inventory);
    console.log(`[Inventory Command] Inventory created successfully`);
    
    return savedInventory;
  }
}
