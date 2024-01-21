import { PickType } from '@nestjs/swagger'

import { User } from '../entities/user.entity'

export class PlainUserDto extends PickType(User, ['email', 'username'] as const) {}
