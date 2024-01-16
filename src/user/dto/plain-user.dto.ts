import { ApiProperty } from '@nestjs/swagger'

import { IsEmail, IsString, Matches } from 'class-validator'

export class PlainUserDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail({}, { message: 'Email must be valid!' })
  email: string

  @ApiProperty({ example: 'testUsername' })
  @IsString()
  @Matches(/^[a-zA-Z\\s]+$/, { each: true })
  username: string
}
