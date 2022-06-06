import { IsNotEmpty } from 'class-validator';
import { StaffCreateDto } from './staff.create.dto';
import { PartialType } from '@nestjs/mapped-types';
import { SchemaTypes } from 'mongoose';

export class StaffUpdateDto extends PartialType(StaffCreateDto){
    @IsNotEmpty({
        type:SchemaTypes.ObjectId
    })
    _id:string;
}