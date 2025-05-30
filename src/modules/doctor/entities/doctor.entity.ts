import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
}
