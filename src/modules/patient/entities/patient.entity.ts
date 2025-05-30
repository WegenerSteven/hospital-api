import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Relation,
  OneToOne,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('increment')
  patientId: number;

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

  @OneToOne(() => Profile, (profile) => profile.patient, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Relation<Profile>;
}
