import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
export class CreateRoomDto {
    _id?:mongoose.Types.ObjectId;

    @IsNotEmpty()
    name:string;
    
    @IsNotEmpty()
    idTypeRoom:string;

    @IsNotEmpty()
    status:boolean;

    image?:string[]
}
