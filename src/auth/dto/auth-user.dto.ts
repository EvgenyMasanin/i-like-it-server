import { ApiProperty } from '@nestjs/swagger'

import { Role } from 'src/role/entities/role.entity'
import { User } from 'src/user/entities/user.entity'
import { PlainUserDto } from 'src/user/dto/plain-user.dto'

import { Tokens } from './tokens.dto'

export class AuthUserDto
  extends PlainUserDto
  implements Tokens, Pick<User, 'id' | 'avatarURL' | 'roles'>
{
  @ApiProperty()
  accessToken: string

  @ApiProperty()
  refreshToken: string

  @ApiProperty()
  id: number

  @ApiProperty()
  avatarURL: string

  @ApiProperty({ type: Role, isArray: true })
  roles: Role[]
}
