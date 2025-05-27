import {
  IsEmail,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export enum Role {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
  MODERATOR = 'moderator',
}

export class CreateAdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
