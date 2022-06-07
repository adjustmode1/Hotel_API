import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image',10,{
    storage:diskStorage({
      destination:'src/save_upload',
      filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
      }
    })
  }))
  create(@Body() createRoomDto: CreateRoomDto,@UploadedFiles() files:Express.Multer.File) {
    // return this.roomService.create(createRoomDto);
    console.log(files)
    return 'ok'
  }

  @Get('list')
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  //chưa xong
  @Patch('update')
  update(@Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
