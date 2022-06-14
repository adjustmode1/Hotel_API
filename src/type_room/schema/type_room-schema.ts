import TestDBSchema, { TestDBDocument} from './../../testdb/schema/testdb.schema';
import { InjectModel, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, model } from "mongoose";
import { TestDB } from "src/testdb/schema/testdb.schema";

export type TypeRoomDocument = TypeRoom & Document;

@Schema({versionKey:false})
export class TypeRoom{
    @Prop({
        type:String,
        required:true
    })
    name:string;

    @Prop({
        type:Number,
        required:true,
    })
    price:number;
}
const TypeRoomSchema = SchemaFactory.createForClass(TypeRoom)

export default TypeRoomSchema;
