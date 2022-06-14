import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Roles } from 'src/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService
    ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles('admin')
  create(@Request() req, @Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(req.info.info._id,createServiceDto);
  }

  @Get('list')
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch('update')
  @UseGuards(AuthGuard)
  @Roles('admin')
  update(@Request() req, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(req.info.info._id,updateServiceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  remove(@Request() req, @Param('id') id: string) {
    return this.servicesService.remove(req.info.info._id,id);
  }
}
