import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { TypeRoom } from 'src/type_room/schema/type_room-schema';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  name: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: TypeRoom.name,
  })
  id_type_room: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  status: boolean;

  @Prop({
    type: [String],
  })
  image: [string];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
