import { PickType } from '@nestjs/swagger'

import { AuthDto } from './auth.dto'

export class SigninDto extends PickType(AuthDto, ['email', 'password'] as const) {}
