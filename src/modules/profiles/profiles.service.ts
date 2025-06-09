import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import * as Bcrypt from 'bcryptjs';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  //hash password before saving it to the database
  private async hashPassword(password: string): Promise<string> {
    const salt = await Bcrypt.genSalt(10);
    return await Bcrypt.hash(password, salt);
  }

  //remove password from profile object
  private removePassword(profile: Profile): Partial<Profile> {
    const { password, hashedRefreshToken, ...rest } = profile;
    return rest;
  }

  async create(createProfileDto: CreateProfileDto): Promise<Partial<Profile>> {
    const existProfile = await this.profileRepository.findOne({
      where: { email: createProfileDto.email },
      select: ['profileId'],
    });
    if (existProfile) {
      throw new Error(
        `Profile with email ${createProfileDto.email} already exists`,
      );
    }
    const newProfile = {
      firstName: createProfileDto.firstName,
      lastName: createProfileDto.lastName,
      email: createProfileDto.email,
      password: await this.hashPassword(createProfileDto.password),
      role: createProfileDto.role || 'USER', // Default to USER
    };

    // Create a new Profile entity
    const savedProfile = await this.profileRepository
      .save(newProfile)
      .then((profile) => {
        return profile;
      })
      .catch((error) => {
        console.error('Error creating profile:', error);
        throw new Error('Failed to create profile');
      });

    // Remove password from the returned profile
    return this.removePassword(savedProfile);
  }

  async findAll(email?: string): Promise<Partial<Profile>[]> {
    let profiles: Profile[];
    if (email) {
      profiles = await this.profileRepository.find({
        where: { email: email },
        relations: ['patient'],
      });
    } else {
      profiles = await this.profileRepository.find({
        relations: ['patient'],
      });
    }

    //remove password from each profile
    return profiles.map((profile) => this.removePassword(profile));
  }

  async findOne(id: number): Promise<Profile> {
    const res = await this.profileRepository.findOneBy({ profileId: id });
    if (!res) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    // Remove password from the profile
    // return this.excludePassword(res);
    return res;
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Partial<Profile> | string> {
    // if the email is being updated, check if it already exists
    if (updateProfileDto.password) {
      // Hash the new password if provided
      updateProfileDto.password = await this.hashPassword(
        updateProfileDto.password,
      );
    }

    await this.profileRepository.update(id, updateProfileDto);

    return await this.findOne(id);
  }

  async remove(id: number): Promise<string> {
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
