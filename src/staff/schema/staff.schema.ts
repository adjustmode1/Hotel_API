import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StaffDocument = Staff & Document;

@Schema({collection:"staff"})
export class Staff{
    @Prop({
        type:String,
        required:true,
    })
    id:string;

    @Prop({
        type:String,
        required:true
    })
    password:string;

    @Prop({
        type:String,
        required:true
    })
    name:string;

    @Prop({
        type:String,
        required:false
    })
    avatar:string;

    @Prop({
        type:Date,
        required:true
    })
    birthday:Date;

    @Prop({
        type:Number,
        required:true
    })
    role:number;

    @Prop({
        type:Date,
        required:true
    })
    first_date:Date;

    @Prop({
        type:Number,
        required:true
    })
    salary:number;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);