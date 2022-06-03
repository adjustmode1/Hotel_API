import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class StaffLoginDto{
    @IsNotEmpty()
    id:string;

    @IsNotEmpty()
    password:string;
}