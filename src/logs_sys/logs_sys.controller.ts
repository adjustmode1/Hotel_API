import { AuthGuard } from './../auth/auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LogsSysService } from './logs_sys.service';
import { Roles } from '../roles.decorator';

@Controller('logsSys')
export class LogsSysController {
  constructor(private readonly logsSysService: LogsSysService) {}

  @Get('list')
  @UseGuards(AuthGuard)
  @Roles('admin')
  findAll() {
    return this.logsSysService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.logsSysService.findOne(id);
  }
}
