import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Patient } from './entities/patient.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Patient, Profile])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
