import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UsePipes,
  ValidationPipe,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import * as fs from 'fs';
import mongoose from 'mongoose';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles.decorator';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: 'src/save_upload',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Request() req,
    @Body() createRoomDto: CreateRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const id = new mongoose.Types.ObjectId();
    createRoomDto._id = id;
    const images: string[] = [];
    const folder: string = 'src/storage/' + createRoomDto._id + '/';
    if (files.length > 0) {
      files.forEach((file) => {
        const path: string = folder + file.filename;
        images.push(path);
      });
    }
    createRoomDto.image = images;
    const result = await this.roomService.create(
      req.info.info._id,
      createRoomDto,
    );
    if (result.status === 200) {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }

      files.forEach((file) => {
        const path: string = 'src/save_upload/' + file.filename;
        const newpath = folder + file.filename;
        fs.renameSync(path, newpath);
      });
      return result.data;
    } else {
      files.forEach((file) => {
        const path: string = 'src/save_upload/' + file.filename;
        fs.rmSync(path);
      });
      throw new HttpException(result.data.result, 400);
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

  //ch??a xong
  @Patch('update')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: 'src/save_upload',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Request() req,
    @Body() updateRoomDto: UpdateRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const room = await this.roomService.findOne(updateRoomDto._id.toString());
    if (room.status === 200 && room.data.length > 0) {
      let images: string[] = [];
      files.forEach((file) => {
        const path = 'src/storage/' + updateRoomDto._id + '/';
        images.push(path + file.filename);
      });
      images = files.length > 0 ? images : room.data.image;
      updateRoomDto.image = images;
      const result = await this.roomService.update(
        req.info.info._id,
        updateRoomDto,
      );
      if (result.status === 200) {
        // c???p nh???t thanh c??ng
        if (files.length > 0) {
          room.data[0].image.forEach((path) => {
            // x??a ???nh c??
            fs.rmSync(path);
          });
        }
        files.forEach((file) => {
          //chuy???n file qua th?? m???c room
          const oldFolder = 'src/save_upload/';
          const newFolder = 'src/storage/' + room.data[0]._id + '/';
          fs.renameSync(oldFolder + file.filename, newFolder + file.filename);
        });
      } else {
        //c???p nh???t kh??ng th??nh c??ng
        files.forEach((file) => {
          //x??a file ???? upload
          const path = 'src/save_upload/';
          fs.rmSync(path + file.filename);
        });
      }
      return result;
    }
    return {
      status: 400,
      data: 'not found',
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async remove(@Request() req, @Param('id') id: string) {
    const room = await this.roomService.findOne(id);
    const result = await this.roomService.remove(req.info.info._id, id);
    if (room.status === 200 && result.status === 200) {
      if (room.data.length > 0) {
        const folder = 'src/storage/' + room.data[0]._id;
        fs.rmSync(folder, { recursive: true, force: true });
      }
    }
    return result;
  }
}
