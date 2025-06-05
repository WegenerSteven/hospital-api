import { IsDate, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsDate()
  appointmentDate: Date;

  @IsString()
  status: string; // e.g., 'scheduled', 'completed', 'canceled'

  @IsString()
  notes?: string; // Optional field for additional notes
}
