import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateDoctorDto } from '../doctor/dto/create-doctor.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { CreateProfileDto } from '../profiles/dto/create-profile.dto';
import { Doctor } from '../doctor/entities/doctor.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const existAdmin = await this.adminRepository.findOneBy({
      adminId: createAdminDto.adminId,
    });
    if (!existAdmin) {
      throw new Error('Admin not found');
    }
    return this.adminRepository.save(createAdminDto);
  }

  findAll() {
    return this.adminRepository.find();
  }

  findOne(id: number) {
    return this.adminRepository.findOne({ where: { adminId: id } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update(id, updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepository.delete(id);
  }

  async createProfile(createProfileDto: CreateProfileDto) {
    const newProfile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(newProfile);
  }

  async findProfileById(id: number) {
    return this.profileRepository.findOneBy({ profileId: id });
  }

  async updateProfile(id: number, updateProfileDto: CreateProfileDto) {
    return this.profileRepository.update({ profileId: id }, updateProfileDto);
  }

  async removeProfile(id: number) {
    return this.profileRepository.delete({ profileId: id });
  }

  async createDoctor(dto: CreateDoctorDto) {
    const doctor = this.doctorRepository.create(dto);
    return await this.doctorRepository.save(doctor);
  }
}
