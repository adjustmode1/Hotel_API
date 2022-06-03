import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeRoomService } from './type_room.service';
import { CreateTypeRoomDto } from './dto/create-type_room.dto';
import { UpdateTypeRoomDto } from './dto/update-type_room.dto';

@Controller('type-room')
export class TypeRoomController {
  constructor(private readonly typeRoomService: TypeRoomService) {}

  @Post()
  create(@Body() createTypeRoomDto: CreateTypeRoomDto) {
    return this.typeRoomService.create(createTypeRoomDto);
  }

  @Get()
  findAll() {
    return this.typeRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeRoomDto: UpdateTypeRoomDto) {
    return this.typeRoomService.update(+id, updateTypeRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeRoomService.remove(+id);
  }
}
