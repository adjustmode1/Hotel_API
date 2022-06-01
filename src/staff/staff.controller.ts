import { StaffUpdateDto } from './dto/staff.update.dto';
import { StaffLoginDto } from './dto/staff.login.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { StaffCreateDto } from './dto/staff.create.dto';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @Get('list')
  async test(@Query() query){
    return "all list"
  }

  @Post('login')
  @UsePipes(new ValidationPipe({transform:true}))
  async login(@Body() login:StaffLoginDto){
    return login;
  }

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body:StaffCreateDto){
    return body;
  }

  @Delete('delete/:id')
  async remove(@Param('id') id:string){
    return id;
  }

  @Put('update')
  async update(@Body() info:StaffUpdateDto){
    return info;
  }
}
