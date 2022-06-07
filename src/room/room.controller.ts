import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UsePipes, ValidationPipe, HttpException } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import * as fs from 'fs';
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('image',10,{
    storage:diskStorage({
      destination:'src/save_upload',
      filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
      }
    })
  }))
  @UsePipes(new ValidationPipe({transform:true}))
  async create(@Body() createRoomDto: CreateRoomDto,@UploadedFiles() files:Array<Express.Multer.File>) {
    console.log(createRoomDto)
    let image:[string];
    if(files.length>0){
      console.log('has file')
      files.forEach(file => {
        let path:string = "src/save_upload/"+file.filename; 
        // fs.rmSync(path);
        image.push(path);
      });
    }
    let result = await this.roomService.create(createRoomDto);
    if(result.status===200){
      let folder:string = 'src/storage/'+createRoomDto.name+'/';
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
  update(@Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
