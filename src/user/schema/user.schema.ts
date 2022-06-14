import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema({collection:"users"})
export class User{
    @Prop({
        type:String,
        unique:true
    })
    gmail:string;

    @Prop({
        type:String
    })
    name:string;

    @Prop()
    gender:boolean;

    @Prop()
    birthday:Date;

    @Prop({
        type:String
    })
    password:string;

    @Prop({
        type:String
    })
    phone:string;

    @Prop({
        type:String
    })
    avatar:string;
}

export const UserSchema = SchemaFactory.createForClass(User)