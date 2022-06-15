import { PartialType } from '@nestjs/mapped-types';
import { CreateTestappDto } from './create-testapp.dto';

export class UpdateTestappDto extends PartialType(CreateTestappDto) {}
