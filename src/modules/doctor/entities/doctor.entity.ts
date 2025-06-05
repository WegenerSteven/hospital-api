import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { MedicalHistory } from 'src/modules/medical-history/entities/medical-history.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  doctorId: number;

  @Column('varchar', { length: 50 })
  firstName: string;

  @Column('varchar', { length: 50 })
  lastName: string;
  @Column('varchar', { length: 100 })
  email: string;
  @Column()
  phoneNumber: string;

  @Column('varchar')
  specialty: string;
  @Column()
  yearsOfExperience: number;

  @Column()
  password: string;

  @Column('boolean', { default: true })
  status: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  @OneToMany(() => MedicalHistory, (history) => history.doctor)
  medicalHistories: MedicalHistory[];
}
