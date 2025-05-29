import { Patient } from 'src/modules/patient/entities/patient.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  DOCTOR = 'doctor',
  PATIENT = 'patient',
  NURSE = 'nurse',
  RECEPTIONIST = 'receptionist',
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  @OneToOne(() => Patient, (patient) => patient.profile)
  patient: Relation<Patient>;
}
