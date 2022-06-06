import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Avatar{
    @Prop({
        type:String
    })
    name:string;
    @Prop({
        type:String
    })
    path:string;
}