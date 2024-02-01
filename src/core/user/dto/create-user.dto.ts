import { ApiProperty } from '@nestjs/swagger'

import { IsNumber, IsString, MinLength } from 'class-validator'

import { PlainUserDto } from './plain-user.dto'

export class CreateUserDto extends PlainUserDto {
  @ApiProperty({ minimum: 8 })
  @IsString()
  @MinLength(8, { message: 'Min password length is 8 symbols!' })
  password: string

  @IsNumber()
  @ApiProperty({ type: [Number] })
  rolesId?: number[]
}
