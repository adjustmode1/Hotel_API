import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class StaffUpdateDto{
    @IsNotEmpty()
    id:string;

    password:string;

    name:string;

    avatar:string;

    birthday:Date;

    role:number;

    first_date:Date;

    salary:number;
}