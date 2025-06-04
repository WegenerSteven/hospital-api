/** 
    @file at.strategy.ts
    @description Access Token Strategy for authentication using Passport.js.
    This strategy validates the access token and retrieves the user information.
*/
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JWTPayload = {
  sub: number; // User ID
  email: string; // User email
};
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-at') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET_TOKEN'),
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    return payload;
  }
}
