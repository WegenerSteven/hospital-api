import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DoctorService {
  constructor(private readonly db: DatabaseService) {}
  // This service is responsible for handling business logic related to doctors.
  // It interacts with the database or other services to perform operations.
  create(createDoctorDto: CreateDoctorDto) {
    return this.db.executeQuery(
      `INSERT INTO Doctor (name, email, phone, specialty, yearsOfExperience, hospitalId, isActive) VALUES($1,$2, $3) RETURNING *`,
      [
        createDoctorDto.doctorId,
        createDoctorDto.name,
        createDoctorDto.email,
        createDoctorDto.phone,
        createDoctorDto.specialty,
        createDoctorDto.yearsOfExperience,
        createDoctorDto.isActive,
      ],
    );
  }

  findAll() {
    return this.db.executeQuery(`SELECT * FROM Doctor`);
  }

  findOne(id: number) {
    return this.db.executeQuery(`SELECT * FROM Doctor WHERE id = $1`, [id]);
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.db.executeQuery(
      `UPDATE Doctor SET name = $1, email = $2, phone = $3, specialty = $4, yearsOfExperience = $5, hospitalId = $6, isActive = $7 WHERE id = $8`,
      [
        updateDoctorDto.doctorId,
        updateDoctorDto.name,
        updateDoctorDto.email,
        updateDoctorDto.phone,
        updateDoctorDto.specialty,
        updateDoctorDto.yearsOfExperience,
        updateDoctorDto.isActive,
        id,
      ],
    );
  }

  remove(id: number) {
    return this.db.executeQuery(`DELETE FROM Doctor WHERE id = $1`, [id]);
  }
}
