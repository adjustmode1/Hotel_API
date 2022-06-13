import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestdbService } from './testdb.service';
import { CreateTestdbDto } from './dto/create-testdb.dto';
import { UpdateTestdbDto } from './dto/update-testdb.dto';

@Controller('testdb')
export class TestdbController {
  constructor(private readonly testdbService: TestdbService) {}

  @Post()
  create(@Body() createTestdbDto: CreateTestdbDto) {
    return this.testdbService.create(createTestdbDto);
  }

  @Get('list')
  findAll() {
    return this.testdbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testdbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestdbDto: UpdateTestdbDto) {
    return this.testdbService.update(+id, updateTestdbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testdbService.remove(+id);
  }
}
