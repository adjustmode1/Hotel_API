// import { databaseProvider } from './database.provider';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[MongooseModule.forRoot('mongodb+srv://thanhhuy:thanhhuy@cluster0.a0gzx.mongodb.net/?retryWrites=true&w=majority')]
})
export class DatabaseModule {}