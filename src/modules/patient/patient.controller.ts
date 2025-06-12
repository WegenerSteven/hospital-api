import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from '../profiles/entities/profile.entity';
import { AtGuard, RolesGuard } from 'src/auth/guards';

@ApiBearerAuth()
@UseGuards(AtGuard, RolesGuard)
@ApiTags('patients')
@Public()
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Roles(Role.ADMIN, Role.PATIENT)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Roles(Role.ADMIN, Role.PATIENT)
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Roles(Role.ADMIN, Role.PATIENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.PATIENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
