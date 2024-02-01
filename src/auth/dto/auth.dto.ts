import { ApiProperty } from '@nestjs/swagger'

import { IsString, MinLength } from 'class-validator'
import { PlainUserDto } from 'src/core/user/dto/plain-user.dto'

export class AuthDto extends PlainUserDto {
  @ApiProperty({ minimum: 8, example: '12345678' })
  @IsString()
  @MinLength(8, { message: 'Min password length is 8 symbols!' })
  password: string
}
