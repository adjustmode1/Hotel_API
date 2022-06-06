import { HashService } from './../hash/hash.service';
import { StaffUpdateDto } from './dto/staff.update.dto';
import { StaffLoginDto } from './dto/staff.login.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe, HttpException, UnauthorizedException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StaffCreateDto } from './dto/staff.create.dto';
import { StaffService } from './staff.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @Get('list')
  async test(@Query() query){
    return this.staffService.findAll()
  }

  @Post('login')
  @UsePipes(new ValidationPipe({transform:true}))
  async login(@Body() login:StaffLoginDto){
    let hash = new HashService();
    let user = await this.staffService.findOne(login.id);
    if(await hash.compare(login.password,user.password)){
      return true;
    }else{
      return false;
    }
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('avatar',{
    storage:diskStorage({
      destination:'src/avatar',
      filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
      }
    })
  }))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body:StaffCreateDto,@UploadedFile() file:Express.Multer.File){
    let sendfile = ""
    let path = "src/avatar/";
    if(file){
      sendfile = path+file.filename;
    }
    let bcrypt = new HashService();
    let pw_hash = await bcrypt.hash(body.password);
    body.password = pw_hash;
    let result = await this.staffService.create(body,sendfile)
    if(result.status===400){
      throw new HttpException(result.data,result.status);
    }
    if(result.status!==200){
      fs.rmSync(sendfile)
    }
    return result.data;
    // return body;
  }

  @Delete('delete/:id')
  async remove(@Param('id') id:string){
    let staff = await this.staffService.findOne(id);
    if(!!staff){
      let result = await this.staffService.removeOne(id);
      if(result.deletedCount===1){
        fs.rmSync(staff.avatar);
      }
      return result.deletedCount
    }
    return 0;
  }


  // chưa xong
  @Put('update')
  @UseInterceptors(FileInterceptor('avatar',{
    storage:diskStorage({
      destination:'src/avatar',
      filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
      }
    })
  }))
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Body() info:StaffUpdateDto,@UploadedFile() file:Express.Multer.File){
    let staff = await this.staffService.findOne(info._id);
    let result = await this.staffService.update(info);
    if(!!file){
      if(result.modifiedCount===1){

      }
      console.log('có file')
    }else{
      console.log("không file")
    }
    return "ok";
  }
}
