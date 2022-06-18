import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { LogsSys, LogsSysSchema } from '../logs_sys/schema/logs_sys.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: LogsSys.name, schema: LogsSysSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
