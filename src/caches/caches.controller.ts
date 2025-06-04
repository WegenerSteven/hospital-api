import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CachesService } from './caches.service';
import { CreateCachDto } from './dto/create-cach.dto';

@Controller('caches')
export class CachesController {
  constructor(private readonly cachesService: CachesService) {}

  @Post()
  create(@Body() createCachDto: CreateCachDto) {
    return this.cachesService.create(createCachDto);
  }

  @Get(':key')
  get(@Param('key') key: string) {
    return this.cachesService.get(key);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.cachesService.remove(key);
  }
}
