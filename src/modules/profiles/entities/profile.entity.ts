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

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('increment')
  profileId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Patient, (patient) => patient.profile)
  patient: Relation<Patient>;
}
