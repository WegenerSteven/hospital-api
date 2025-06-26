import { IsEmail, IsNumber, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({
    description: 'The first name of the doctor',
    required: true,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the doctor',
    required: true,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The email address of the doctor',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The phone number of the doctor',
    required: true,
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'The specialty of the doctor',
    required: true,
  })
  @IsString()
  specialty: string;

  @ApiProperty({
    description: 'The years of experience of the doctor',
    required: true,
  })
  @IsNumber()
  yearsOfExperience: number;

  @ApiProperty({
    description: 'The password of the doctor',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The status of the doctor',
    required: true,
  })
  @IsBoolean()
  status: boolean;
}
