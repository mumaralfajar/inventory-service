export interface CheckStockRequest {
  productId: string;
}

export interface CheckStockResponse {
  stock: number;
}

export interface InventoryGrpcService {
  checkStock(request: CheckStockRequest): Promise<CheckStockResponse>;
}
