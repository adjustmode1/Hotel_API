import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StaffDocument = Staff & Document;

@Schema({collection:"staff"})
export class Staff{
    @Prop()
    id_staff:string;

    @Prop()
    name:string;

    @Prop()
    gender:Boolean;

    @Prop()
    birthday:Date;

    @Prop()
    phoneNumber:string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);