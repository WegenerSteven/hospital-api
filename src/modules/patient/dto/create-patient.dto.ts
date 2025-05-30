import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @IsDateString()
  @IsNotEmpty()
  dateOfAdmission: Date;

  @IsDateString()
  @IsNotEmpty()
  dateOfDischarge: Date;

  @IsDateString()
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsNumber()
  profileId: number;
}
