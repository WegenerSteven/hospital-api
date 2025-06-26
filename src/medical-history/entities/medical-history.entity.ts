import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';

@Entity('medical_histories')
export class MedicalHistory {
  @PrimaryGeneratedColumn()
  historyId: number;

  @ManyToOne(() => Patient, (patient) => patient.medicalHistory, {
    eager: true,
  })
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.medicalHistory, { eager: true })
  doctor: Doctor;

  @Column()
  diagnosis: string;

  @Column()
  treatment: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
