import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../../entities/inventory.entity';
import { GetStockQuery } from '../queries/get-stock.query';

@QueryHandler(GetStockQuery)
export class GetStockHandler implements IQueryHandler<GetStockQuery> {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async execute(query: GetStockQuery): Promise<number> {
    console.log(`[Inventory Query] Getting stock for product ${query.productId}`);
    
    const inventory = await this.inventoryRepository.findOne({
      where: { productId: query.productId },
    });

    return inventory?.stock || 0;
  }
}
