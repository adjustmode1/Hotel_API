import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
export class CreateOrderDto {
  @IsNotEmpty()
  idUser: string;

  @IsNotEmpty()
  @IsNumber()
  totalPerson: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  status: number;

  services?: string[];

  @IsNotEmpty()
  rooms: string[];
}
