import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalHistoryDto {
  @ApiProperty({
    description: 'The unique identifier of the patient',
    required: true,
  })
  @IsNumber()
  patientId: number;

  @ApiProperty({
    description: 'The unique identifier of the doctor',
    required: true,
  })
  @IsNumber()
  doctorId: number;

  @ApiProperty({
    description: 'The diagnosis of the patient',
    required: true,
  })
  @IsString()
  diagnosis: string;

  @ApiProperty({
    description: 'The treatment plan for the patient',
    required: true,
  })
  @IsString()
  treatment: string;

  @ApiProperty({
    description: 'The date of the medical history entry',
    required: false,
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  date?: Date; // Optional, defaults to current timestamp
}
