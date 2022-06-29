import { PartialType } from '@nestjs/mapped-types';
import { CreateTestmicroDto } from './create-testmicro.dto';

export class UpdateTestmicroDto extends PartialType(CreateTestmicroDto) {
  id: number;
}
