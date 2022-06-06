import { Prop, Schema } from "@nestjs/mongoose";


@Schema()
export class Romm{
    @Prop()
    id_type_room:string;

    @Prop()
    status:boolean;

    @Prop()
    image:[]
}