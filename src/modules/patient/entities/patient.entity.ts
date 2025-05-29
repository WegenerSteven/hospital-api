import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Relation,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  patientId: number | string;

  @Column('varchar', { length: 50 })
  firstName: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 10 })
  phoneNumber: string;

  @Column('date')
  dateOfAdmission: Date;

  @Column('date')
  dateOfDischarge: Date;

  @Column('date')
  dateOfBirth: Date;

  @Column('varchar', { length: 255 })
  address: string;

  @Column({ nullable: true })
  city?: string;

  @JoinColumn()
  profile: Relation<Profile>;
}
