import { Body, Controller, Get, Post } from '@nestjs/common';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @Get()
  test(){
    // return this.staffService.login();
  }
  @Post('login')
  async login(@Body() id){
    console.log('ctrl',id)
    let result = null;
    result = await this.staffService.login(id.id_staff);
    return result;
  }
}
