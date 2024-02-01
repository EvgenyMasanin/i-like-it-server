import { HttpStatus } from '@nestjs/common'

export const NO_CONTENT_RESPONSE = {
  status: HttpStatus.NO_CONTENT,
  description: 'Success operation without response.',
}
