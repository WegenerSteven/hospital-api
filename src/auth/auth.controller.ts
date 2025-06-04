import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //auth /signin
  @Post()
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  //auth/signout/:id
  @Get('signout/:id')
  signOut(@Param('id', ParseIntPipe) id: number) {
    return this.authService.signOut(id);
  }

  //auth/refresh/:id
  @Get('refresh')
  refreshTokens(@Query('id', ParseIntPipe) id: number) {
    return this.authService.refreshToken(id);
  }
