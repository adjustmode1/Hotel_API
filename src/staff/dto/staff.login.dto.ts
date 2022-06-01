import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class StaffLoginDto{
    @IsNotEmpty()
    id:string;

    @IsNotEmpty()
    @MinLength(8)
    password:string;
}