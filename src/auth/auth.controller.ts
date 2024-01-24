import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'

import { GetCurrentUserId, Public } from 'src/common/decorators'
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard'
import { Documentation } from 'src/common/decorators/documentation.decorator'
import { GetRefreshToken } from 'src/common/decorators/auth/get-refresh-token.decorator'

import {
  LOGOUT_DOCUMENTATION,
  ME_DOCUMENTATION,
  REFRESH_DOCUMENTATION,
  SIGNIN_DOCUMENTATION,
  SIGNUP_DOCUMENTATION,
} from './documentation'
import { AuthDto } from './dto/auth.dto'
import { Tokens } from './dto/tokens.dto'
import { AuthService } from './auth.service'
import { AuthUserDto } from './dto/auth-user.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Documentation(SIGNUP_DOCUMENTATION)
  signup(@Body() dto: AuthDto): Promise<AuthUserDto> {
    return this.authService.signup(dto)
  }

  @Post('signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Documentation(SIGNIN_DOCUMENTATION)
  async signin(@Body() dto: AuthDto): Promise<AuthUserDto> {
    return await this.authService.signin(dto)
  }

  @Post('logout')
  @HttpCode(HttpStatus.RESET_CONTENT)
  @Documentation(LOGOUT_DOCUMENTATION)
  async logout(@GetCurrentUserId() userId: number) {
    return await this.authService.logout(userId)
  }

  @Get('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @Documentation(REFRESH_DOCUMENTATION)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetRefreshToken() refreshToken: string
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(userId, refreshToken)
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Documentation(ME_DOCUMENTATION)
  async getMe(@GetCurrentUserId() userId: number): Promise<AuthUserDto> {
    return await this.authService.getMe(userId)
  }
}
