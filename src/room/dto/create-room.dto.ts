import { IsNotEmpty } from 'class-validator';
export class CreateRoomDto {
    @IsNotEmpty()
    name:string;
    
    @IsNotEmpty()
    idTypeRoom:string;

    @IsNotEmpty()
    status:boolean;

    image?:[string]
}
