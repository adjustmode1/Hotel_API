import { HashService } from './../hash/hash.service';
import { StaffUpdateDto } from './dto/staff.update.dto';
import { StaffLoginDto } from './dto/staff.login.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe, HttpException, UnauthorizedException, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { StaffCreateDto } from './dto/staff.create.dto';
import { StaffService } from './staff.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles.decorator';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get('list')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async test(@Query() query){
    console.log('listall')
    return this.staffService.findAll()
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles('admin')
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
  @UseGuards(AuthGuard)
  @Roles('admin')
  async remove(@Param('id') id:string){
    let staff = await this.staffService.findOne(id);
    console.log('delet',staff)
    if(!!staff){
      let result = await this.staffService.removeOne(id);
      if(result.deletedCount===1){
        try {
          fs.rmSync(staff.avatar)
        } catch (error) {
          
        }
      }
      return result.deletedCount
    }
    return 0;
  }

  @Put('update')
  @UseGuards(AuthGuard)
  @Roles('admin')
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
    let staff = await this.staffService.findByIdOne(info._id);
    if(!!file){
      info.avatar = "src/avatar/"+file.filename;
    }
    let result = await this.staffService.update(staff._id,info);
    if(result.modifiedCount===1&&!!file){
      fs.rmSync(staff.avatar);
    }
    return result;
  }
}
