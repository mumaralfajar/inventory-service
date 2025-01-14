import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InventoryGrpcService } from '../../services/inventory.grpc.service';
import { CheckStockRequest, CheckStockResponse } from '../interfaces/inventory.interface';

@Controller()
export class InventoryGrpcController {
  constructor(private readonly inventoryGrpcService: InventoryGrpcService) {}

  @GrpcMethod('InventoryService', 'CheckStock')
  async checkStock(data: CheckStockRequest): Promise<CheckStockResponse> {
    console.log('[gRPC Controller] CheckStock called with:', data);
    const result = await this.inventoryGrpcService.checkStock(data);
    console.log('[gRPC Controller] Returning:', result);
    return result;
  }
}
