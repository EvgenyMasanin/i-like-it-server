import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { GetCurrentUserId, Public } from 'src/common/decorators'
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard'
import { Documentation } from 'src/common/decorators/documentation.decorator'
import { GetRefreshToken } from 'src/common/decorators/get-refresh-token.decorator'

import { AuthDto } from './dto/auth.dto'
import { Tokens } from './dto/tokens.dto'
import { AuthService } from './auth.service'
import { AuthUserDto } from './dto/auth-user.dto'
import { logoutDoc, meDoc, refreshDoc, signinDoc, signupDoc } from './documentation'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Documentation(signupDoc)
  signup(@Body() dto: AuthDto): Promise<AuthUserDto> {
    return this.authService.signup(dto)
  }

  @Post('signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Documentation(signinDoc)
  async signin(@Body() dto: AuthDto): Promise<AuthUserDto> {
    return await this.authService.signin(dto)
  }

  @Post('logout')
  @HttpCode(HttpStatus.RESET_CONTENT)
  @Documentation(logoutDoc)
  async logout(@GetCurrentUserId() userId: number) {
    return await this.authService.logout(userId)
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Documentation(refreshDoc)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetRefreshToken() refreshToken: string
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(userId, refreshToken)
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Documentation(meDoc)
  async getMe(@GetCurrentUserId() userId: number): Promise<AuthUserDto> {
    return await this.authService.getMe(userId)
  }
}
