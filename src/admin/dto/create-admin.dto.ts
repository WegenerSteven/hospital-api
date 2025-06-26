import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  // @ApiProperty({
  //   description: 'The unique identifier of the admin',
  //   required: true,
  // })
  // @IsNumber()
  // adminId: number;

  @ApiProperty({
    description: 'The username of the admin',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password of the admin',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The email of the admin',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Indicates if the admin is active',
    required: true,
  })
  @IsBoolean()
  isActive: boolean;
}
