import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[MongooseModule.forRoot('mongodb+srv://thanhhuy:thanhhuy@cluster0.a0gzx.mongodb.net/?retryWrites=true&w=majority')]
    // imports:[MongooseModule.forRoot('mongodb://thanhhuy:thanhhuy@localhost:27017/nest_mongo')]
})
export class DatabaseModule {}