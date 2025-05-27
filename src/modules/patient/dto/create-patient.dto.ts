import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @IsNumberString()
  @IsNotEmpty()
  patientId?: string;
  @IsString()
  firstName: string;
  @IsString()
  @IsOptional()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNumber()
  phoneNumber: string;
  @IsDate()
  @IsNotEmpty()
  dateOfAdmission: Date;
  @IsDate()
  @IsNotEmpty()
  dateOfDischarge: Date;
  @IsDate()
  dateOfBirth: Date;
  @IsNumberString()
  address: string;
  @IsString()
  @IsOptional()
  city: string;
}
