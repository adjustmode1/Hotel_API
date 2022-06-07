import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeRoomDto } from './create-type_room.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTypeRoomDto extends PartialType(CreateTypeRoomDto){
    @IsNotEmpty()
    id:string;
}
