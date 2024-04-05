import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices'
import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'

import { MicroService } from 'src/rmq'
import { HashService } from 'src/hash/hash.service'
import { MailService } from 'src/mail/mail.service'
import { UserService } from 'src/core/user/user.service'
import { User } from 'src/core/user/entities/user.entity'
import { ConfirmationEmailDto } from 'src/mail/dto/confirmation-email.dto'

import { AuthDto } from './dto/auth.dto'
import { Tokens } from './dto/tokens.dto'
import { SigninDto } from './dto/signin.dto'
import { AuthUserDto } from './dto/auth-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signup({ username, email, password }: AuthDto): Promise<AuthUserDto> {
    //TODO: role selection
    const newUser = await this.userService.create({ username, email, password, rolesId: [1, 3] })

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.roles.map((r) => r.name)
    )

    await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken)

    this.sentConfirmationEmail(email, username)

    return this.getAuthUserDto(newUser, tokens)
  }

  async signin({ email, password }: SigninDto): Promise<AuthUserDto> {
    const user = await this.userService.findOneByEmail(email)

    if (!user) throw new UnauthorizedException('Incorrect email or password')

    const passwordHash = await this.userService.getPassword(user.id)

    const passwordMatches = await this.hashService.compareData(password, passwordHash)

    if (!passwordMatches) throw new UnauthorizedException('Incorrect email or password')

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.roles.map((r) => r.name)
    )

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken)

    this.mailService.testChannel()

    return this.getAuthUserDto(user, tokens)
  }

  async logout(userId: number) {
    await this.userService.updateRefreshToken(userId, null)
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

    if (!user || !refreshToken) throw new ForbiddenException('Access denied')

    const rtMatches = await this.hashService.compareData(rt, refreshToken)
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
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(tokensPayload, {
        secret: `refresh-${privateKey}`,
        expiresIn: '30d',
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
    await this.userService.updateRefreshToken(userId, hash)
  }

  async sentConfirmationEmail(email: string, username: string) {
    const timestamp = Date.now()

    const tokenData = `${email}.${timestamp}`

    const confirmationToken = await this.hashService.hashData(tokenData)

    const confirmationUrl = `${this.configService.get('CONFIRMATION_URL')}/${confirmationToken}`

    this.mailService.sentConfirmationEmail({ email, username, confirmationUrl })
  }
}
