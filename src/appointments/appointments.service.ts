import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}
  create(createAppointmentDto: CreateAppointmentDto) {
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  findAll() {
    return this.appointmentRepository.find();
  }

  findOne(id: number) {
    return this.appointmentRepository.findOne({ where: { appointmentId: id } });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentRepository
      .update(id, updateAppointmentDto)
      .then((result) => {
        if (result.affected === 0) {
          return `Appointment with ID ${id} not found`;
        }
      });
  }

  remove(id: number): Promise<void> {
    return this.appointmentRepository
      .delete(id)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Appointment with ID ${id} not found`);
        }
      })
      .catch((error) => {
        console.error('Error deleting appointment:', error);
        throw new Error('Error deleting appointment');
      });
  }
}
