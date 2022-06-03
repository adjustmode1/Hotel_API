import { PartialType } from '@nestjs/mapped-types';
import { CreateLogsSyDto } from './create-logs_sy.dto';

export class UpdateLogsSyDto extends PartialType(CreateLogsSyDto) {}
