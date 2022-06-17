import { Document, SchemaTypes } from 'mongoose';
import { SchemaFactory, Prop } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import { Room } from 'src/room/schema/room.schema.ts';
import { Services } from 'src/services/schema/services.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
  })
  idUser: string;

  @Prop({
    type: Number,
    required: true,
  })
  totalPerson: number;

  @Prop({
    type: Date,
    required: true,
  })
  startDate: Date;

  @Prop({
    type: Date,
  })
  endDate: Date;

  @Prop({
    type: Number,
    default: 0,
  })
  status: number;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: Services.name,
  })
  services: string[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: Room.name,
  })
  rooms: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
