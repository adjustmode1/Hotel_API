import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ServicesDocument = Services & Document;

@Schema()
export class Services{
    @Prop({
        type:String,
        required:true
    })
    name:string;

    @Prop({
        type:Number,
        required:true
    })
    price:number;

    @Prop({
        type:{
        name:String,
        id:String}
    })
    document:{
        name:string,
        id:string
    };
}

export const ServicesSchema = SchemaFactory.createForClass(Services)