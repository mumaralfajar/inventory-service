import { Controller, Post, Body } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';
import { CreateInventoryDto } from '../dto/create-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }
}
