import { Injectable } from '@nestjs/common';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { Repository, DataSource } from 'typeorm';
import { Doctor } from '../modules/doctor/entities/doctor.entity';
import { Profile, Role } from '../modules/profiles/entities/profile.entity';
import { Admin } from '../modules/admin/entities/admin.entity';
import { Logger } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { InjectRepository } from '@nestjs/typeorm';

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
    this.logger.log('starting database seeding...');
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
        await queryRunner.query('DELETE FROM patients');
        await queryRunner.query('DELETE FROM profile');
        await queryRunner.query('DELETE FROM doctors');
        // await queryRunner.query('DELETE FROM department');

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
        // Create an array to hold the seeded patients
        const patients: Patient[] = [];
        for (let i = 0; i < 50; i++) {
          // create new profile
          const profile = new Profile();
          profile.firstName = faker.person.firstName();
          profile.lastName = faker.person.lastName();
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

          // set patient properties
          patient.dateOfAdmission = faker.date.past();
          patient.dateOfDischarge = faker.date.future({});
          patient.dateOfBirth = faker.date.birthdate({
            min: 18,
            max: 90,
            mode: 'age',
          });
          patient.address = faker.location.streetAddress();
          patient.city = faker.location.city();

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
      //seed doctors
      this.logger.log('Seeding doctors...');
      const doctorQueryRunner = this.datasource.createQueryRunner();
      await doctorQueryRunner.connect();
      await doctorQueryRunner.startTransaction();
      try {
        // Create an array to hold the seeded doctors
        const doctors: Doctor[] = [];
        for (let i = 0; i < 10; i++) {
          const doctor = new Doctor();
          doctor.firstName = faker.person.firstName();
          doctor.lastName = faker.person.lastName();
          doctor.email = faker.internet.email({
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            provider: '@google.com',
          });
          doctor.phoneNumber = faker.phone.number();
          doctor.specialty = faker.name.jobArea();
          doctor.yearsOfExperience = faker.number.int({ min: 1, max: 10 });
          doctor.password = faker.internet.password();
          doctor.status = faker.datatype.boolean();

          doctors.push(doctor);
        }

        await doctorQueryRunner.manager.save(doctors);
        await doctorQueryRunner.commitTransaction();
        this.logger.log(`Seeded ${doctors.length} doctors successfully`);
      } catch (error) {
        await doctorQueryRunner.rollbackTransaction();
        this.logger.error('Error seeding doctors:', error);
        throw error;
      } finally {
        await doctorQueryRunner.release();
      }

      return { message: 'Database seeded successfully' };
    } catch (error) {
      this.logger.error('Error seeding database:', error);
      throw error;
    }
  }
}
