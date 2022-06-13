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

export const TypeRoomSchema = SchemaFactory.createForClass(TypeRoom)
    .post('save', async (content)=>{
        const testModel = mongoose.model('testdbs',TestDBSchema)
        testModel.find()
        .then(res=>{
            console.log('f',res)
        })
        .catch(err=>{
            console.log('err',err)
        })
        console.log('hook',content)
    })
    .pre('save',async (next)=>{
        console.log('pre hook');
        next()
    })