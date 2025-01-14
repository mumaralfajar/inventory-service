import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { CheckStockRequest, CheckStockResponse } from '../grpc/interfaces/inventory.interface';

@Injectable()
export class InventoryGrpcService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async checkStock(data: CheckStockRequest): Promise<CheckStockResponse> {
    console.log('[gRPC Service] Processing request:', data);
    const inventory = await this.inventoryRepository.findOne({
      where: { productId: data.productId },
    });
    const stock = inventory?.stock || 0;
    console.log('[gRPC Service] Found stock:', stock);
    return { stock };
  }
}
