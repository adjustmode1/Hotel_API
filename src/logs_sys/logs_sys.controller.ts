import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogsSysService } from './logs_sys.service';
import { CreateLogsSyDto } from './dto/create-logs_sy.dto';
import { UpdateLogsSyDto } from './dto/update-logs_sy.dto';

@Controller('logs-sys')
export class LogsSysController {
  constructor(private readonly logsSysService: LogsSysService) {}

  @Post()
  create(@Body() createLogsSyDto: CreateLogsSyDto) {
    return this.logsSysService.create(createLogsSyDto);
  }

  @Get()
  findAll() {
    return this.logsSysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logsSysService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogsSyDto: UpdateLogsSyDto) {
    return this.logsSysService.update(id, updateLogsSyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logsSysService.remove(id);
  }
}
