import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type TestDBDocument = TestDB & Document;

@Schema({versionKey:false})
export class TestDB{
    @Prop({
        type:String,
        required:true
    })
    name:string;
}

const TestDBSchema = SchemaFactory.createForClass(TestDB)
TestDBSchema.post('save', async (content)=>{
            console.log('hook',content)
        })
        .pre('save',async (next)=>{
            console.log('pre hook');
            next()
        })

export default  TestDBSchema;
//     .post('save', async (content)=>{
//         console.log('hook',content)
//     })
//     .pre('save',async (next)=>{
//         console.log('pre hook');
//         next()
//     })