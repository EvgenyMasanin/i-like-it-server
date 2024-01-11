import { User } from 'src/user/entities/user.entity'

import { Tokens } from '../types'

export class AuthUserDto implements Tokens {
  accessToken: string
  refreshToken: string
  user: Pick<User, 'id' | 'email' | 'roles'>
}
