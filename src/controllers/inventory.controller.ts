import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateInventoryCommand } from '../cqrs/commands/create-inventory.command';
import { CreateInventoryDto } from '../dto/create-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.commandBus.execute(
      new CreateInventoryCommand(
        createInventoryDto.productId,
        createInventoryDto.stock
      )
    );
  }
}
