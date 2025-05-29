import {
  IsEmail,
  IsEnum,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Role } from '../entities/profile.entity';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Role, {
    message:
      'Role must be one of the following: user, admin, doctor, patient, nurse, receptionist',
  })
  role: Role;
}
