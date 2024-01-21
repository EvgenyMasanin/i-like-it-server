import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserService } from 'src/user/user.service'
import { TokensPayload } from 'src/auth/dto/tokens.dto'

import { JwtStrategies } from '../types'

@Injectable()
export class AtJwtStrategy extends PassportStrategy(Strategy, JwtStrategies.JWT) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `access-${configService.get('PRIVATE_KEY')}`,
    })
  }
  async validate(payload: TokensPayload) {
    const { sub: userId } = payload

    const refreshToken = await this.userService.getRefreshToken(+userId)

    if (!refreshToken) {
      throw new UnauthorizedException()
    }
    return payload
  }
}
