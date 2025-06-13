import { Doctor } from 'src/modules/doctor/entities/doctor.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';
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
  history_id: number;

  @Column()
  patient_id: number;

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
