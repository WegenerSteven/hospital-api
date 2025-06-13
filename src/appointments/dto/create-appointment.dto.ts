import { IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'The unique identifier of the patient',
    required: true,
  })
  @IsDateString()
  appointmentDate: string;

  @ApiProperty({
    description: 'The status of the appointment',
    required: true,
    enum: ['scheduled', 'completed', 'canceled'],
  })
  @IsString()
  status: string; // e.g., 'scheduled', 'completed', 'canceled'

  @ApiProperty({
    description: 'Additional notes for the appointment',
    required: false,
  })
  @IsString()
  notes?: string; // Optional field for additional notes
}
