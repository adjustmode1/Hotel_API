import { IsNotEmpty } from 'class-validator';
export class CreateLogsSyDto {
    @IsNotEmpty()
    id_staff:string;

    @IsNotEmpty()
    action:string;

    @IsNotEmpty()
    date:Date;

    @IsNotEmpty()
    document:{
        name:string,
        id:string
    };
}
