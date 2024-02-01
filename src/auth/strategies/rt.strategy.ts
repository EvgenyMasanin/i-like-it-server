import { Request } from 'express'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'

import { TokensPayload } from 'src/auth/dto/tokens.dto'

import { JwtStrategies } from './jwt-strategies.enum'

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, JwtStrategies.JWT_REFRESH) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `refresh-${configService.get('PRIVATE_KEY')}`,
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: TokensPayload) {
    const [, refreshToken] = req.headers.authorization.split(' ')
    return {
      ...payload,
      refreshToken,
    }
  }
}
