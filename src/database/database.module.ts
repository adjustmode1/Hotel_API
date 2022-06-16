// import { databaseProvider } from './database.provider';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    // imports:[MongooseModule.forRoot('mongodb://thanhhuy:thanhhuy@localhost:27017/nest_mongo')]
    imports:[MongooseModule.forRoot('mongodb://localhost:6789/local')]
    // imports:[MongooseModule.forRoot('mongodb+srv://thanhhuy:thanhhuy@cluster0.a0gzx.mongodb.net/?retryWrites=true&w=majority')]
})
export class DatabaseModule {}