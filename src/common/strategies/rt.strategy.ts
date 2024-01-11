import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { JwtPayload, JwtStrategies } from '../types'

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, JwtStrategies.JWT_REFRESH) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `refresh-${configService.get('PRIVATE_KEY')}`,
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: JwtPayload) {
    const [, refreshToken] = req.headers.authorization.split(' ')
    return {
      ...payload,
      refreshToken,
    }
  }
}
