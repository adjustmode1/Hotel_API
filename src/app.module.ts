import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [DatabaseModule, AdminModule, StaffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
