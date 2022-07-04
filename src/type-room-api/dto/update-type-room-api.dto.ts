import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeRoomApiDto } from './create-type-room-api.dto';

export class UpdateTypeRoomApiDto extends PartialType(CreateTypeRoomApiDto) {}
