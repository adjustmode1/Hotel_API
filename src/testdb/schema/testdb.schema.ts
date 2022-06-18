import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestDBDocument = TestDB & Document;

@Schema({ versionKey: false })
export class TestDB {
  @Prop({
    type: String,
    required: true,
  })
  name: string;
}

const TestDBSchema = SchemaFactory.createForClass(TestDB);

export default TestDBSchema;
