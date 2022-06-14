import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogsSysService } from './logs_sys.service';
import { CreateLogsSyDto } from './dto/create-logs_sy.dto';
import { UpdateLogsSyDto } from './dto/update-logs_sy.dto';

@Controller('logsSys')
export class LogsSysController {
  constructor(private readonly logsSysService: LogsSysService) {}

  @Get('list')
  findAll() {
    return this.logsSysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logsSysService.findOne(id);
  }

}
