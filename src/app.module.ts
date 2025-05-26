import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';

@Module({
  imports: [DatabaseModule, AdminModule, DoctorModule, PatientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
