import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateTypeRoomDto {
    @IsNotEmpty()
    _id:string;

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    price:number;
}
