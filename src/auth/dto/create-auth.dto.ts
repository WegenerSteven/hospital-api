import { IsEmail, IsNotEmpty, isNotEmpty } from 'class-validator';
import { isSet } from 'util/types';

export class CreateAuthDto {
  @IsEmail()
  @isNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNotEmpty()
  password: string;
}
