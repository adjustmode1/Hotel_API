import { IsNotEmpty } from 'class-validator';
export class CreateTestDto {
    @IsNotEmpty()
    name:String

    @IsNotEmpty()
    nest:{
        id:string,
        name:string
    }
}
