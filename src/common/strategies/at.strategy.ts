import { ExtractJwt, Strategy } from 'passport-jwt'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { JwtPayload, JwtStrategies } from '../types'

@Injectable()
export class AtJwtStrategy extends PassportStrategy(Strategy, JwtStrategies.JWT) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `access-${configService.get('PRIVATE_KEY')}`,
    })
  }
  //TODO: throw UnauthorizedException if user refresh token is null 
  validate(payload: JwtPayload) {
    return payload
  }
}
