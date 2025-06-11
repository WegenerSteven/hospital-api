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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CreateDoctorDto } from '../doctor/dto/create-doctor.dto';
import { CheckPolicies } from 'src/casl/decorators/check-policies.decorator';
import { Action } from 'src/casl/action.enum';
import { AtGuard, RolesGuard } from 'src/auth/guards';

@ApiTags('admin')
@UseGuards(AuthGuard('jwt'), PoliciesGuard)
@CheckPolicies((ability) => ability.can(Action.Manage, 'All'))
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Post('doctors')
  @CheckPolicies((ability) => ability.can(Action.Create, 'Doctor'))
  createDoctor(@Body() dto: CreateDoctorDto) {
    return this.adminService.createDoctor(dto);
  }
}
