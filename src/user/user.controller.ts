import { Roles } from './../roles.decorator';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { HashService } from './../hash/hash.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, HttpException, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as fs from 'fs';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('avatar',{
    storage:diskStorage({
      destination:"src/avatar/",
      filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
      }
    })
  }))
  @UsePipes(new ValidationPipe({transform:true}))
  @UseGuards(AuthGuard)
  @Roles('admin','user')
  async create(@Body() createUserDto: CreateUserDto,@UploadedFile() file:Express.Multer.File) {
    console.log(createUserDto)
    const hash = new HashService();
    const pass_hash = await hash.hash(createUserDto.password);
    createUserDto.password = pass_hash;
    createUserDto.avatar = "";
    if(file){
      createUserDto.avatar = "src/avatar/"+file.filename;
    }
    return this.userService.create(createUserDto)
    .then(res=>{
      return res;
    })
    .catch(err=>{
      fs.rmSync('src/avatar/'+file.filename)
      return err.result;
    })
  }

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  
  //chưa xong
  @Patch('update')
  @UseGuards(AuthGuard)
  @Roles('admin','user')
  @UseInterceptors(FileInterceptor('avatar',{
    storage:diskStorage({
      destination:'src/avatar',
      filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
      }
    })
  }))
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Body() updateUserDto: UpdateUserDto,@UploadedFile() file:Express.Multer.File){
    const user = await this.userService.findOne(updateUserDto._id);
    if(file){
      updateUserDto.avatar = "src/avatar/"+file.filename;
    }
    if(user){
      return this.userService.update(updateUserDto).then(res=>{
        fs.rmSync(user.avatar.toString())
        return res;
      }).catch(err=>{
        fs.rmSync("src/avatar/"+file.filename)
        return err;
      })
    }
    throw new HttpException("not found",400)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async remove(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if(user){
      return this.userService.remove(id).then(res=>{
        console.log(res)
        fs.rmSync(user[0].avatar.toString())
        return {
          status:200,
          data:'ok'
        }
      })
    }
    throw new HttpException("not found",400)
  }
}
