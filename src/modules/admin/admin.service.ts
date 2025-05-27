import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminService {
  constructor(private db: DatabaseService) {}

  create(createAdminDto: CreateAdminDto) {
    return this.db.executeQuery(
      `INSERT INTO Admin (username, password, email, isActive, createdAt) VALUES($1,$2, $3) RETURNING *`,
      [
        createAdminDto.username,
        createAdminDto.password,
        createAdminDto.email,
        createAdminDto.isActive,
        createAdminDto.createdAt || new Date(),
      ],
    );
  }

  async findAll() {
    const result = await this.db.executeQuery(`SELECT * FROM Admin`);
    return result.rows;
  }

  async findOne(id: number) {
    const result = await this.db.executeQuery(
      `SELECT * FROM Admin WHERE id = $1`,
      [id],
    );
    return result.rows[0];
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const { username, email, isActive } = updateAdminDto;
    const result = await this.db.executeQuery(
      `UPDATE Admin SET username = $1, email = $2, is_active = $3 WHERE id = $4`,
      [username, email, isActive, id],
    );
    return (result.rowCount ?? 0) > 0;
  }

  async remove(id: number) {
    const result = await this.db.executeQuery(
      `DELETE FROM Admin WHERE id = $1`,
      [id],
    );
    return (result.rowCount ?? 0) > 0;
  }
}
