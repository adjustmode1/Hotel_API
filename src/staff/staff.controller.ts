import { HashService } from './../hash/hash.service';
import { StaffUpdateDto } from './dto/staff.update.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  HttpException,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StaffCreateDto } from './dto/staff.create.dto';
import { StaffService } from './staff.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles.decorator';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get('list')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async findOne(@Param('id') id) {
    return this.staffService.findOne(id);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'src/avatar',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Request() req,
    @Body() body: StaffCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let sendfile = '';
    const path = 'src/avatar/';
    if (file) {
      sendfile = path + file.filename;
    }
    const bcrypt = new HashService();
    const pw_hash = await bcrypt.hash(body.password);
    body.password = pw_hash;
    const result = await this.staffService.create(
      req.info.info._id,
      body,
      sendfile,
    );
    if (result.status === 400) {
      throw new HttpException(result.data, result.status);
    }
    if (result.status !== 200) {
      fs.rmSync(sendfile);
    }
    return result.data;
    // return body;
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async remove(@Request() req, @Param('id') id: string) {
    const staff = await this.staffService.findOne(id);
    if (staff) {
      const result = await this.staffService.removeOne(req.info.info._id, id);
      if (result.deletedCount === 1) {
        try {
          fs.rmSync(staff.avatar);
        } catch (error) {
          console.log(error);
        }
      }
      return result.deletedCount;
    }
    return 0;
  }

  @Put('update')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'src/avatar',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Request() req,
    @Body() info: StaffUpdateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const staff = await this.staffService.findByIdOne(info._id);
    if (file) {
      info.avatar = 'src/avatar/' + file.filename;
    }
    const result = await this.staffService.update(
      req.info.info._id,
      staff._id,
      info,
    );
    if (result.status === 200 && result.data.modifiedCount === 1 && !!file) {
      fs.rmSync(staff.avatar);
    }
    return result;
  }
}
