import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateTypeRoomDto {
    @IsNotEmpty()
    id:string;

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    price:number;
}
