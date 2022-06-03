import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, SchemaType } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({
        type:mongoose.Types.ObjectId
    })
    _id:string;

    @Prop()
    name:string;

    @Prop()
    gender:boolean;

    @Prop()
    birthday:Date;

    @Prop()
    password:String;

    @Prop()
    phone:String;

    @Prop()
    avatar:String;
}

export const UserSchema = SchemaFactory.createForClass(User)