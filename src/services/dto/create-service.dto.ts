import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateServiceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
