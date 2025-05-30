import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    return await this.profileRepository
      .save(createProfileDto)
      .then((profile) => {
        return profile;
      })
      .catch((error) => {
        console.error('Error creating profile:', error);
        throw new Error('Profile creation failed');
      });
  }

  async findAll(email?: string) {
    if (email) {
      return await this.profileRepository.find({
        where: { email: email },
        relations: ['patient'],
      });
    }
    return await this.profileRepository.find({
      relations: ['patient'],
    });
  }

  async findOne(id: number) {
    return await this.profileRepository
      .findOneBy({ profileId: id })
      .then((profile) => {
        if (!profile) {
          return `Profile with id ${id} not found`;
        }
        return profile;
      });
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile | string> {
    await this.profileRepository.update({ profileId: id }, updateProfileDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.profileRepository
      .delete({ profileId: id })
      .then((result) => {
        if (result.affected === 0) {
          return `Profile with id ${id} not found`;
        }
        return `Profile with id ${id} removed successfully`;
      })
      .catch((error) => {
        console.error('Error removing profile:', error);
        throw new Error('Profile removal failed');
      });
  }
}
