import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number;
}
