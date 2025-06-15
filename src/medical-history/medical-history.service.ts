import { Injectable } from '@nestjs/common';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private readonly medicalHistoryRepository: Repository<MedicalHistory>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  create(createMedicalHistoryDto: CreateMedicalHistoryDto) {
    return this.medicalHistoryRepository.save(createMedicalHistoryDto);
  }

  findAll() {
    return this.medicalHistoryRepository.find();
  }

  findOne(id: number) {
    return this.medicalHistoryRepository.findOne({
      where: { historyId: id },
      relations: ['patient', 'doctor'],
      select: {
        historyId: true,
        // If you want to select the whole patient object, just use 'patient: true'
        patient: true,
      },
    });
  }

  update(id: number, updateMedicalHistoryDto: UpdateMedicalHistoryDto) {
    return this.medicalHistoryRepository
      .update(id, updateMedicalHistoryDto)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Medical history with ID ${id} not found`);
        }
        return this.medicalHistoryRepository.findOne({
          where: { historyId: id },
          relations: ['patient', 'doctor'],
        });
      })
      .catch((error) => {
        console.error('Error updating medical history:', error);
        throw new Error('Error updating medical history');
      });
  }

  remove(id: number) {
    return this.medicalHistoryRepository.delete(id);
  }
}
