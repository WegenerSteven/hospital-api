import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCachDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsNumber()
  @IsOptional()
  ttl?: number;
}
