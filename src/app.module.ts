import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { DepartmentsModule } from './modules/departments/departments.module';
//import { SeedModule } from './seed/seed.module';
import { LogsModule } from './logs/logs.module';
import { LoggerMiddleware } from './logger.middleware';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Keyv, createKeyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { MedicalHistoryModule } from './modules/medical-history/medical-history.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    AdminModule,
    DoctorModule,
    PatientModule,
    ProfilesModule,
    DepartmentsModule,
    //SeedModule,
    LogsModule,
    //add cache module from cache manager
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (ConfigService: ConfigService) => {
        return {
          //ttl: 60000,
          stores: [
            new Keyv({
              store: new CacheableMemory({
                ttl: 30000,
                lruSize: 5000,
              }),
            }),
            createKeyv(ConfigService.getOrThrow<string>('REDIS_URL')),
          ],
        };
      },
    }),
    AuthModule,
    AppointmentsModule,
    MedicalHistoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AtGuard, //global guard to protect routes
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        'profiles',
        'departments',
        'doctors',
        'patients',
        'appointments',
        'medical-history',
      );
  }
}
