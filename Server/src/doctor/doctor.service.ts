import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorRepository.save(createDoctorDto);
  }

  findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  findOne(id: number): Promise<Doctor | null> {
    return this.doctorRepository.findOne({ where: { doctorId: id } });
  }

  async update(
    id: number,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor | null> {
    await this.doctorRepository.update(id, updateDoctorDto);
    return this.doctorRepository.findOne({ where: { doctorId: id } });
  }

  remove(id: number) {
    return this.doctorRepository.delete(id);
  }
}
