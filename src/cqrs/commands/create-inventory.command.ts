export class CreateInventoryCommand {
  constructor(
    public readonly productId: string,
    public readonly stock: number,
  ) {}
}
