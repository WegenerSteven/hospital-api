import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  adminId: number;

  @Column('varchar')
  username: string;

  @Column('varchar', { unique: true })
  password: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_login: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
