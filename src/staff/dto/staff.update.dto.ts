import { IsNotEmpty } from 'class-validator';
import { StaffCreateDto } from './staff.create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class StaffUpdateDto extends PartialType(StaffCreateDto) {
  @IsNotEmpty()
  _id: string;
}
