import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTypeRoomDto{
    @IsNotEmpty()
    id:string;

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    price:number;
}
