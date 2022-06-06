import { HashService } from './../../hash/hash.service';
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Blob } from "buffer";
import { Document } from "mongoose";
import { Avatar } from "./file.schema";

export type StaffDocument = Staff & Document;

@Schema({collection:"staff",
toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },})
export class Staff{
    @Prop({
        type:String,
        unique:true,
        required:true,
    })
    gmail:string;

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

    @Prop({
        type:String
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