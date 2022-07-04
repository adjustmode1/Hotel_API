import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeRoomMicroServiceDto } from './create-type-room-micro-service.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTypeRoomMicroServiceDto extends PartialType(CreateTypeRoomMicroServiceDto) {
  @IsNotEmpty()
  id: string;
}
