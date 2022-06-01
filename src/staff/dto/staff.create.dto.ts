import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class StaffCreateDto{
    @IsNotEmpty()
    id:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    name:string;

    avatar:string;

    @IsNotEmpty()
    birthday:Date;

    @IsNumber()
    role:number;

    @IsNotEmpty()
    first_date:Date;

    @IsNumber()
    salary:number;
}