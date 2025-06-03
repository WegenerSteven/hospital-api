import { Injectable } from '@nestjs/common';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { Repository } from 'typeorm';
import { Doctor } from '../modules/doctor/entities/doctor.entity';
import { Profile } from '../modules/profiles/entities/profile.entity';
import { Admin } from '../modules/admin/entities/admin.entity';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../modules/profiles/dto/create-profile.dto';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    // Inject repositories or services needed for seeding data
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly datasource: DataSource,
  ) {}
  async seed() {
    //1. clear existing data from database
    //2. seed patients >>> doctors
    //3. seed profiles and patients with random appointments

    try {
      this.logger.log('clearing the database...');
      const queryRunner = this.datasource.createQueryRunner();
      await queryRunner.connect();

      //perform transactions
      await queryRunner.startTransaction();

      //delete data in tables
      try {
        await queryRunner.query('DELETE FROM patient');
        await queryRunner.query('DELETE FROM profile');
        await queryRunner.query('DELETE FROM doctor');
        await queryRunner.query('DELETE FROM department');

        await queryRunner.commitTransaction();
        this.logger.log('All tables cleared successfully');
      } catch (error) {
        await queryRunner.rollbackTransaction();
        this.logger.error('Error clearing tables:', error);
        throw error;
      } finally {
        await queryRunner.release();
      }
      // The real seeding logic starts below
      //seed patients and profiles
      this.logger.log('Seeding profiles and patients...');
      const seedQueryRunner = this.datasource.createQueryRunner();
      await seedQueryRunner.connect();
      await seedQueryRunner.startTransaction();

      try {
        const patients: Patient[] = [];

        for (let i = 0; i < 50; i++) {
          // create new profile
          const profile = new Profile();
          profile.firstName = faker.person.firstName();
          profile.email = faker.internet.email({
            firstName: profile.firstName,
            lastName: profile.lastName,
            provider: '@google.com',
          });
          profile.role = Role.PATIENT;
          // add any other non-nullable columns here

          const savedProfile = await seedQueryRunner.manager.save(profile);
          // create new patient
          const patient = new Patient();

          //link profile to patient
          patient.profile = savedProfile;

          //save the patient
          const savedPatient = await seedQueryRunner.manager.save(patient);
          patients.push(savedPatient);
        }

        await seedQueryRunner.commitTransaction();
        this.logger.log(
          `Seeded ${patients.length} patients with profiles successfully`,
        );
      } catch (error) {
        await seedQueryRunner.rollbackTransaction();
        this.logger.error('Error seeding data:', error);
        throw error;
      } finally {
        await seedQueryRunner.release();
      }
      return { message: 'Database seeded successfully' };
    } catch (error) {
      this.logger.error('Error seeding database:', error);
      throw error;
    }
  }
}
