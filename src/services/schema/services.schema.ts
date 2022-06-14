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
}

export const ServicesSchema = SchemaFactory.createForClass(Services)