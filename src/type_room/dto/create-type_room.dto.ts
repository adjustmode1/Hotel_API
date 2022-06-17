import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateTypeRoomDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
