import { IsEmail, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  specialty: string;

  @IsNumber()
  yearsOfExperience: number;

  @IsString()
  password: string;

  @IsBoolean()
  status: boolean;
}
