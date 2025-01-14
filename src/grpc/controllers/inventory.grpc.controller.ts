import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { GetStockQuery } from '../../cqrs/queries/get-stock.query';

interface CheckStockRequest {
  productId: string;
}

interface CheckStockResponse {
  stock: number;
}

@Controller()
export class InventoryGrpcController {
  constructor(private readonly queryBus: QueryBus) {}

  @GrpcMethod('InventoryService', 'CheckStock')
  async checkStock(data: CheckStockRequest): Promise<CheckStockResponse> {
    console.log('[gRPC Controller] CheckStock called with:', data);
    
    const stock = await this.queryBus.execute(
      new GetStockQuery(data.productId)
    );
    
    console.log('[gRPC Controller] Returning stock:', stock);
    return { stock };
  }
}
