import { IsNotEmpty, IsNumber, MinLength } from "class-validator";

export class StaffCreateDto{
    @IsNotEmpty()
    id:string;

    @IsNotEmpty()
    @MinLength(8)
    password:string;

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    birthday:Date;

    @IsNotEmpty()
    role:number;

    @IsNotEmpty()
    first_date:Date;

    avatar:object;

    @IsNotEmpty()
    salary:number;
}