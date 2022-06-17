import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  gmail: string;

  @IsNotEmpty()
  password: string;
}
