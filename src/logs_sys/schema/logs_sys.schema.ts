import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type LogsSysDocument = LogsSys & Document;

@Schema()
export class LogsSys{
    @Prop()
    id_staff:string;

    @Prop()
    action:string;

    @Prop()
    date:Date;

    @Prop({
        type:{
            name:String,
            id:String
        }
    })
    document:{
        id:string;
        name:string;
    }
}

export const LogsSysSchema = SchemaFactory.createForClass(LogsSys)