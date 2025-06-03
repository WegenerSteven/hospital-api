import { Controller, HttpStatus, Post, HttpCode } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  // Define endpoints for seeding data here
  @Post()
  @HttpCode(HttpStatus.OK)
  seed() {
    return this.seedService.seed();
  }
}
