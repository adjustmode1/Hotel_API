import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UsePipes, ValidationPipe, HttpException } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import * as fs from 'fs';
import mongoose from 'mongoose';
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images',10,{
    storage:diskStorage({
      destination:'src/save_upload',
      filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
      }
    })
  }))
  @UsePipes(new ValidationPipe({transform:true}))
  async create(@Body() createRoomDto: CreateRoomDto,@UploadedFiles() files:Array<Express.Multer.File>) {
    let id = new mongoose.Types.ObjectId()
    createRoomDto._id = id;
    let images:string[] = []
    let folder:string = 'src/storage/'+createRoomDto._id+'/';
    if(files.length>0){
      files.forEach(file => {
        let path:string = folder+file.filename; 
        images.push(path);
      });
    }
    createRoomDto.image = images;
    let result = await this.roomService.create(createRoomDto);
    if(result.status===200){
      if(!fs.existsSync(folder)){
        fs.mkdirSync(folder)
      }

      files.forEach(file=>{
        let path:string = "src/save_upload/"+file.filename; 
        let newpath = folder + file.filename;
        fs.renameSync(path,newpath)
      })
      return result.data;
    }else{
      files.forEach(file=>{
        let path:string = "src/save_upload/"+file.filename; 
        fs.rmSync(path);
      })
      throw new HttpException(result.data.result,400);
    }
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
  @UseInterceptors(FilesInterceptor("images",10,{
    storage:diskStorage({
      destination:'src/save_upload',
      filename:(req,file,cb)=>{
        cb(null,Date.now+file.originalname);
      }
    })
  }))
  async update(@Body() updateRoomDto: UpdateRoomDto,@UploadedFiles() files:Array<Express.Multer.File>) {
    let room = await this.roomService.findOne(updateRoomDto._id.toString());
    if(room.status===200&&room.data.length>0){
      this.roomService.update(updateRoomDto);
    }
    return "ok"
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let room = await this.roomService.findOne(id);
    let result = await this.roomService.remove(id);
    if(room.status===200&&result.status===200){
        if(room.data.length>0){
          let folder = "src/storage/"+room.data[0]._id;
          fs.rmSync(folder, { recursive: true, force: true });
        }
    }
    return result
  }
}
