import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateDoctorDto {
  @IsNumberString()
  @IsNotEmpty()
  doctorId?: number;
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNumber()
  phone: string;

  @IsString()
  specialty: string;

  @IsNumber()
  yearsOfExperience: number;

  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  profileId: number;
}
