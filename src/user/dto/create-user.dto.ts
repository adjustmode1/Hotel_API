import { IsBoolean, IsNotEmpty, MinLength, IsAlphanumeric, IsEmail, IsNumberString, IsDateString, IsString } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    gmail:string;

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    gender:Boolean;
    
    @IsNotEmpty()
    @IsDateString()
    birthday:Date;

    @IsNotEmpty()
    @MinLength(8)
    password:string;

    @IsAlphanumeric()
    @IsNumberString()
    @MinLength(8)
    phone:string;

    avatar?:string;
}
