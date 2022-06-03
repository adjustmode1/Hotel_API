import { HashService } from './../hash/hash.service';
import { StaffUpdateDto } from './dto/staff.update.dto';
import { StaffLoginDto } from './dto/staff.login.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe, HttpException, UnauthorizedException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StaffCreateDto } from './dto/staff.create.dto';
import { StaffService } from './staff.service';
import { FileInterceptor } from '@nestjs/platform-express';

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
    let hash = new HashService();
    let user = await this.staffService.findOne(login.id);
    if(await hash.compare(login.password,user.password)){
      return true;
    }else{
      return false;
    }
  }

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body:StaffCreateDto){
    let bcrypt = new HashService();
    let pw_hash = await bcrypt.hash(body.password);
    body.password = pw_hash;
    let result = await this.staffService.create(body)
    if(result.status===400){
      throw new HttpException(result.data,result.status);
    }
    return result.data;
  }

  @Post('upload/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(@Body() body,@UploadedFile() file:Express.Multer.File){
    this.staffService.uploadAvatar(body.id,file);
    return "ok"
  }

  @Delete('delete/:id')
  async remove(@Param('id') id:string){
    let result = await this.staffService.removeOne(id);
    return result.deletedCount;
  }


  // chưa xong
  @Put('update')
  async update(@Body() info:StaffUpdateDto){
    return info;
  }

  // chưa xong
  @Put('update/avatar')
  async updateAvatar(@Body() info){
    return info;
  }
}
