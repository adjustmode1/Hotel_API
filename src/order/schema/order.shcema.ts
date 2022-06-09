import { Document, SchemaTypes } from 'mongoose';
import { SchemaFactory, Prop } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order{
    @Prop({
        type:SchemaTypes.ObjectId,
        ref:'users'
    })
    idUser:string;
    
    @Prop({
        type:Number,
        required:true
    })
    totalPerson:number;

    @Prop({
        type:Date,
        required:true
    })
    startDate:Date;

    @Prop({
        type:Date,
    })
    endDate:Date;

    @Prop({
        type:Number,
        default:0
    })
    status:number;

    @Prop({
        type:[SchemaTypes.ObjectId],
        ref:'services'
    })
    services:string[]

    @Prop({
        type:[SchemaTypes.ObjectId],
        ref:'rooms'
    })
    rooms:string[]
}

export const OrderSchema = SchemaFactory.createForClass(Order);