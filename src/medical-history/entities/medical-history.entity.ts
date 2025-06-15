import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  Entity,
} from 'typeorm';

@Entity('medical_histories')
export class MedicalHistory {
  @PrimaryGeneratedColumn()
  historyId: number;

  @Column()
  patientId: number;

  @Column()
  diagnosis: string;

  @Column()
  treatment: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToOne(() => Patient, (patient) => patient.medicalHistory)
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.medicalHistories)
  doctor: Doctor;
}
