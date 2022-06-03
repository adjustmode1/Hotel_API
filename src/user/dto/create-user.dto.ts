import { IsBoolean, IsNotEmpty, MinLength, IsAlphanumeric, IsEmail, IsPhoneNumber, IsNumberString, Min } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    gmail:string;

    @IsNotEmpty()
    name:string;

    @IsBoolean()
    gender:Boolean;

    @IsNotEmpty()
    birthday:Date;

    @IsNotEmpty()
    @MinLength(8)
    password:string;

    @IsAlphanumeric()
    @IsNumberString()
    @MinLength(8)
    phone:string;

    avatar:string;
}
