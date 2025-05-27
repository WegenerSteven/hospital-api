import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

@Module({
  controllers: [DatabaseController],

  providers: [DatabaseService],
  exports: [DatabaseService], // Exporting the service to be used in other modules
})
export class DatabaseModule {}
