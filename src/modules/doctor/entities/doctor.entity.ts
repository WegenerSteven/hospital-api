import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  doctorId: number | string;

  @Column('varchar', { length: 50 })
  firstName: string;

  @Column('varchar', { length: 50 })
  lastName: string;
  @Column('varchar', { length: 100 })
  email: string;
  @Column('varchar', { length: 15 })
  phoneNumber: string;

  @Column('varchar', { length: 100 })
  specialty: string;
  @Column('int')
  yearsOfExperience: number;

  @Column('varchar', { length: 100 })
  password: string;

  @Column('boolean', { default: true })
  status: boolean;
}
