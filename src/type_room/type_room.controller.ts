import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TypeRoomService } from './type_room.service';
import { CreateTypeRoomDto } from './dto/create-type_room.dto';
import { UpdateTypeRoomDto } from './dto/update-type_room.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles.decorator';

@Controller('typeRoom')
export class TypeRoomController {
  constructor(private readonly typeRoomService: TypeRoomService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Request() req, @Body() createTypeRoomDto: CreateTypeRoomDto) {
    return this.typeRoomService.create(req.info.info._id, createTypeRoomDto);
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
  update(@Request() req, @Body() updateTypeRoomDto: UpdateTypeRoomDto) {
    return this.typeRoomService.update(req.info.info._id, updateTypeRoomDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  remove(@Request() req, @Param('id') id: string) {
    return this.typeRoomService.remove(req.info.info._id, id);
  }
}
