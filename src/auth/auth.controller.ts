import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //auth /signin
  @Post('signin')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  //auth/signout/:id
  @Get('signout/:id')
  signOut(@Param('id', ParseIntPipe) id: number) {
    return this.authService.signOut(id);
  }

  //auth/refresh?id=123&refreshToken=yourtoken
  @Get('refresh')
  refreshTokens(
    @Query('id', ParseIntPipe) id: number,
    @Query('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(id, refreshToken);
  }
}
