import { PartialType } from '@nestjs/mapped-types';
import { CreateCachDto } from './create-cach.dto';

export class UpdateCachDto extends PartialType(CreateCachDto) {}
