import { Controller, Get, Post, Body, Patch, Param, Delete,  ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { TypeRoomService } from './type_room.service';
import { CreateTypeRoomDto } from './dto/create-type_room.dto';
import { UpdateTypeRoomDto } from './dto/update-type_room.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles.decorator';

@Controller('typeRoom')
export class TypeRoomController {
  constructor(private readonly typeRoomService: TypeRoomService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @UsePipes(new ValidationPipe({transform:true}))
  create(@Body() createTypeRoomDto: CreateTypeRoomDto) {
    return this.typeRoomService.create(createTypeRoomDto);
  }

  @Get('list')
  findAll() {
    return this.typeRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeRoomService.findOne(id);
  }

  @Patch('update')
  @UseGuards(AuthGuard)
  @Roles('admin')
  update(@Body() updateTypeRoomDto: UpdateTypeRoomDto) {
    return this.typeRoomService.update(updateTypeRoomDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.typeRoomService.remove(id);
  }
}
