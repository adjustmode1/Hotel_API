import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema({collection:"users"})
export class User{
    @Prop({
        type:String,
        unique:true
    })
    gmail:string;

    @Prop()
    name:string;

    @Prop()
    gender:boolean;

    @Prop()
    birthday:Date;

    @Prop()
    password:string;

    @Prop()
    phone:string;

    @Prop()
    avatar:string;
}

export const UserSchema = SchemaFactory.createForClass(User)