import { Controller, Get,Param } from '@nestjs/common';
import { LogsSysService } from './logs_sys.service';

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
