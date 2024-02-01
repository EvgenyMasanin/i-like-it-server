import { HttpStatus } from '@nestjs/common'

export const UNAUTHORIZED_RESPONSE = {
  status: HttpStatus.UNAUTHORIZED,
  description: 'Unauthorized user!',
} as const
