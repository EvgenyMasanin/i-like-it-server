import { HashService } from 'src/hash/hash.service'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'

import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { AuthUserDto } from './dto/auth-user.dto'
import { AuthDto } from './dto/auth.dto'
import { Tokens } from './types'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signup({ email, password }: AuthDto): Promise<AuthUserDto> {
    if (await this.userService.findOneByEmail(email))
      throw new UnauthorizedException('This email is already used!')

    const newUser = await this.userService.create({ email, password, rolesId: [1, 3] })

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.roles.map((r) => r.name)
    )

    await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken)

    return this.getUserWithTokens(newUser, tokens)
  }

  async signin({ email, password }: AuthDto): Promise<AuthUserDto> {
    const user = await this.userService.findOneByEmail(email)

    if (!user) throw new ForbiddenException('Access denied')

    const passwordMatches = await this.hashService.compareData(password, user.password)

    if (!passwordMatches) throw new ForbiddenException('Access denied')

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.roles.map((r) => r.name)
    )

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken)

    return this.getUserWithTokens(user, tokens)
  }

  async logout(userId: number) {
    await this.userService.update(userId, {
      refreshToken: null,
    })
  }

  async getMe(userId: number) {
    const user = await this.userService.findOne(userId)

    if (!user) throw new ForbiddenException('Access denied')

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.roles.map((r) => r.name)
    )

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken)

    return this.getUserWithTokens(user, tokens)
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.userService.findOne(userId)

    if (!user || !user.refreshToken) throw new ForbiddenException('Access denied')

    const rtMatches = this.hashService.compareData(rt, user.refreshToken)
    if (!rtMatches) throw new ForbiddenException('Access denied')

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.roles.map((r) => r.name)
    )

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken)

    return tokens
  }

  async getTokens(userId: number, email: string, roles: string[]): Promise<Tokens> {
    const tokensPayload = {
      sub: userId,
      email,
      roles,
    }

    const privateKey = this.configService.get('PRIVATE_KEY')

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(tokensPayload, {
        secret: `access-${privateKey}`,
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(tokensPayload, {
        secret: `refresh-${privateKey}`,
        expiresIn: '7d',
      }),
    ])

    return {
      accessToken: at,
      refreshToken: rt,
    }
  }

  getUserWithTokens({ id, email, roles }: User, tokens: Tokens): AuthUserDto {
    return {
      ...tokens,
      user: {
        id,
        email,
        roles,
      },
    }
  }

  async updateRefreshTokenHash(userId: number, rt: string) {
    const hash = await this.hashService.hashData(rt)
    await this.userService.update(userId, { refreshToken: hash })
  }
}
