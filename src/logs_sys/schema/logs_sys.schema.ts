import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

export type LogsSysDocument = LogsSys & Document;

@Schema()
export class LogsSys{
    @Prop()
    id_staff:string;

    @Prop()
    action:string;

    @Prop({
        type:Date,
        default:()=>{
            return Date.now();
        }
    })
    date:Date;

    @Prop({
        type:String
    })
    document:string

    @Prop({
        type:Object
    })
    data:object
}

export const LogsSysSchema = SchemaFactory.createForClass(LogsSys)