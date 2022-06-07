import { IsDateString, IsNotEmpty, IsNumber, MinLength } from "class-validator";

export class StaffCreateDto{
    @IsNotEmpty()
    gmail:string;

    @IsNotEmpty()
    @MinLength(8)
    password:string;

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsDateString()
    birthday:Date;

    @IsNotEmpty()
    role:number;

    @IsNotEmpty()
    first_date:Date;

    avatar?:string;

    @IsNotEmpty()
    salary:number;
}