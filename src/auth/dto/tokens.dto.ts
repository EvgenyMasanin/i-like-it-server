import { ApiProperty } from '@nestjs/swagger'

export class Tokens {
  @ApiProperty()
  accessToken: string

  @ApiProperty()
  refreshToken: string
}

export class TokensPayload {
  sub: number
  email: string
  roles: string[]
}
