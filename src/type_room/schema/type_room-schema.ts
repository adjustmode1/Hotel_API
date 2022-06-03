import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TypeRoomDocument = TypeRoom & Document;

@Schema()
export class TypeRoom{
    @Prop({
        type:String,
        required:true
    })
    _id:string;

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

export const TypeRoomSchema = SchemaFactory.createForClass(TypeRoom)