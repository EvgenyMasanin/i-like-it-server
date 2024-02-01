import { HttpStatus } from '@nestjs/common'

export const FORBIDDEN_RESPONSE = {
  status: HttpStatus.FORBIDDEN,
  description: 'You does not have permission for this action!',
} as const
