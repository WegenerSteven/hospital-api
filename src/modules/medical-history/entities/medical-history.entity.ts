import { PrimaryGeneratedColumn, Column } from "typeorm";

export class MedicalHistory {
    @PrimaryGeneratedColumn()
    history_id: number

    @Column()
    patient_id: number;

    @Column()
    doctor_id: number;

    @Column()
    diagnosis: string;

    @Column()
    treatment: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    date: 
}
