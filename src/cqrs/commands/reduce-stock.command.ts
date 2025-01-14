export class ReduceStockCommand {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
  ) {}
}
