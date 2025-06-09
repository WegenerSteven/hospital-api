import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Profile } from '../modules/profiles/entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy, RfStrategy } from './strategies';
import { RolesGuard } from './guards';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Profile]),
    JwtModule.register({
      global: true,
    }), // Register JwtModule with global configuration
    PassportModule, // Register PassportModule for strategies
  ],
  providers: [AuthService, AtStrategy, RfStrategy],
  controllers: [AuthController],
  exports: [RolesGuard], //export rolesGuard to be accessed in other modules
})
export class AuthModule {}
