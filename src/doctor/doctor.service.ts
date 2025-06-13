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

  findAll() {
    return this.doctorRepository.find();
  }

  findOne(id: number) {
    return this.doctorRepository.findOne({ where: { doctorId: id } });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorRepository.update(id, updateDoctorDto);
  }

  remove(id: number) {
    return this.doctorRepository.delete(id);
  }
}
