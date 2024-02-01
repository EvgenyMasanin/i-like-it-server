import { ApiProperty } from '@nestjs/swagger'

import { Role } from 'src/core/role/entities/role.entity'
import { User } from 'src/core/user/entities/user.entity'
import { PlainUserDto } from 'src/core/user/dto/plain-user.dto'

import { Tokens } from './tokens.dto'

export class AuthUserDto
  extends PlainUserDto
  implements Tokens, Pick<User, 'id' | 'avatarURL' | 'roles'>
{
  @ApiProperty()
  accessToken: string

  @ApiProperty()
  refreshToken: string

  @ApiProperty({ example: 42 })
  id: number

  @ApiProperty({ example: 'avatars/3ae56ab5926a103d49072e76cd288ae28.jpg' })
  avatarURL: string

  @ApiProperty({ type: [Role] })
  roles: Role[]
}
