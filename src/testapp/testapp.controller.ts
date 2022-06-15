import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestappService } from './testapp.service';
import { CreateTestappDto } from './dto/create-testapp.dto';
import { UpdateTestappDto } from './dto/update-testapp.dto';

@Controller('testapp')
export class TestappController {
  constructor(private readonly testappService: TestappService) {}

  @Post()
  create(@Body() createTestappDto: CreateTestappDto) {
    return this.testappService.create(createTestappDto);
  }

  @Get()
  findAll() {
    return this.testappService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testappService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestappDto: UpdateTestappDto) {
    return this.testappService.update(+id, updateTestappDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testappService.remove(+id);
  }
}
