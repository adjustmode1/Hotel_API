import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateTypeRoomMicroServiceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
