import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'

import { HashService } from 'src/hash/hash.service'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/entities/user.entity'

import { AuthDto } from './dto/auth.dto'
import { Tokens } from './dto/tokens.dto'
import { AuthUserDto } from './dto/auth-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signup({ username, email, password }: AuthDto): Promise<AuthUserDto> {
    if (await this.userService.findOneByEmail(email))
      throw new UnauthorizedException('This email is already used!')
    //TODO: role selection
    const newUser = await this.userService.create({ username, email, password, rolesId: [1, 3] })

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.roles.map((r) => r.name)
    )

    await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken)

    return this.getAuthUserDto(newUser, tokens)
  }

  async signin({ email, password }: AuthDto): Promise<AuthUserDto> {
    const user = await this.userService.findOneByEmail(email)
    const passwordHash = await this.userService.getPassword(user.id)

    if (!user) throw new ForbiddenException('Access denied')

    const passwordMatches = await this.hashService.compareData(password, passwordHash)

    if (!passwordMatches) throw new ForbiddenException('Access denied')

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.roles.map((r) => r.name)
    )

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken)

    return this.getAuthUserDto(user, tokens)
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

    return this.getAuthUserDto(user, tokens)
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.userService.findOne(userId)
    const refreshToken = await this.userService.getRefreshToken(userId)
    
    if (!user || !user.refreshToken) throw new ForbiddenException('Access denied')

    const rtMatches = this.hashService.compareData(rt, refreshToken)
    if (!rtMatches) throw new ForbiddenException('Access denied')

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.roles.map((r) => r.name)
    )

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
        expiresIn: '7d',//TODO: fix it
      }),
      this.jwtService.signAsync(tokensPayload, {
        secret: `refresh-${privateKey}`,
        expiresIn: '7d',
      }),
    ])

    await this.updateRefreshTokenHash(userId, rt)

    return {
      accessToken: at,
      refreshToken: rt,
    }
  }

  getAuthUserDto({ id, email, avatarURL, username, roles }: User, tokens: Tokens): AuthUserDto {
    return {
      ...tokens,
      id,
      username,
      avatarURL,
      email,
      roles,
    }
  }

  async updateRefreshTokenHash(userId: number, rt: string) {
    const hash = await this.hashService.hashData(rt)
    await this.userService.update(userId, { refreshToken: hash })
  }
}
