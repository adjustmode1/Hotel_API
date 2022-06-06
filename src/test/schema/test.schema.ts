import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TestDocument = Test & Document;

@Schema()
export class Test{
    @Prop({
        type:String,
        required:true,
        unique:true
    })
    name:string;

    @Prop({
        type:{
            id:String,
            name:String
        }
    })
    nest:{
        id:string,
        name:string
    }
}

export const TestSchema = SchemaFactory.createForClass(Test)