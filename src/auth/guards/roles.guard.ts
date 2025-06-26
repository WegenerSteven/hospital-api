import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Role } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { ROLES_KEY } from '../decorators/role.decorator';
import { JWTPayload } from '../strategies/at.strategy';
import { Request } from 'express';

interface UserRequest extends Request {
  user?: JWTPayload; //Extend request to include user property
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rolesRequired = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rolesRequired) {
      return true; //No roles required, allow access
    }

    const request = context.switchToHttp().getRequest<UserRequest>();
    const user = request.user;

    if (!user) {
      return false; //no user in request
    }

    //fetch profile
    const UserProfile = await this.profileRepository.findOne({
      where: { profileId: user.sub },
      select: ['profileId', 'role'],
    });

    if (!UserProfile) {
      return false; //User profile not found
    }

    //check if user's role is in the required roles
    return rolesRequired.some((role) => UserProfile.role === role);
  }
}
