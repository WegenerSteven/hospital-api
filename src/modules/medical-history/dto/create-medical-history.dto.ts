import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMedicalHistoryDto {
  @IsNumber()
  patientId: number;
  @IsNumber()
  doctorId: number;

  @IsString()
  diagnosis: string;

  @IsString()
  treatment: string;

  @IsOptional()
  date?: Date; // Optional, defaults to current timestamp
}
