import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const existProfile = await this.profileRepository.findOneBy({
      profileId: createPatientDto.profileId,
    });
    if (!existProfile) {
      throw new Error('Profile not found');
    }
    return this.patientRepository.save(createPatientDto);
  }

  findAll() {
    return this.patientRepository.find({
      relations: ['appointments'],
    });
  }

  findOne(id: number) {
    return this.patientRepository.findOne({
      where: { patientId: id },
      relations: ['profile'],
    });
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientRepository
      .update(id, updatePatientDto)
      .then((result) => {
        if (result.affected === 0) {
          return `Patient with ID ${id} not found`;
        }
      })
      .catch((error) => {
        console.error('Error updating patient:', error);
        throw new Error('Error updating patient');
      });
  }

  remove(id: number | string) {
    return this.patientRepository.delete(id);
  }
}
