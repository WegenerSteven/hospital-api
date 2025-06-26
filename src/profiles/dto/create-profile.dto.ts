import {
  IsEmail,
  IsEnum,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Role } from '../entities/profile.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    description: 'profile first name',
    example: 'John',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'profile last name',
    example: 'Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    description: 'profile email',
    example: 'john.doe@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'profile password',
    example: 'strongpassword',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'profile role',
    example: 'USER',
    required: false,
  })
  @IsEnum(Role, {
    message:
      'Role must be one of the following: user, admin, doctor, patient, nurse, receptionist',
  })
  role: Role = Role.USER;
}
