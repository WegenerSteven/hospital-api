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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
// import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { AtGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';

@ApiBearerAuth()
@ApiTags('admin')
@UseGuards(RolesGuard, AtGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
