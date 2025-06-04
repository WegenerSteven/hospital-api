import { Patient } from "src/modules/patient/entities/patient.entity";
import { Column, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

export class Appointment {
    @PrimaryGeneratedColumn()
    appointmentId: number;
    
    @Column()
    appointmentDate: Date;
    
    @Column()
    status: string; // e.g., 'scheduled', 'completed', 'canceled'
    
    @Column({ type: 'text', nullable: true })
    notes?: string; // Optional field for additional notes
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    
    patientId: number;
    
    doctorId: number;

}
