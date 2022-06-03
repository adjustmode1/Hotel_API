import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeRoomDto } from './create-type_room.dto';

export class UpdateTypeRoomDto extends PartialType(CreateTypeRoomDto) {}
