import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  // This service is responsible for handling authentication logic.
  // It will interact with the database to manage user sessions, tokens, etc.
  constructor(
    // Inject any necessary dependencies here, such as a user repository or token service.
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  refreshToken(id: number) {}

  async signIn(CreateAuthDto: CreateAuthDto) {
    //checj if user exists in the database
    const foundUser = await this.profileRepository.findOne({
      where: { email: CreateAuthDto.email },
      select: ['id', 'email', 'password'],
    });
    if (!foundUser) {
      throw new NotFoundException(`no user with ${email} found`);
    }
  }
  signOut(id: number) {}
}
