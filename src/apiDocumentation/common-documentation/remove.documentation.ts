import { HttpStatus } from '@nestjs/common'
import { ApiResponseOptions } from '@nestjs/swagger'

import { IDocumentation } from 'src/common/decorators'

import { UNAUTHORIZED_RESPONSE } from '../responses'
import { FORBIDDEN_RESPONSE } from '../responses/forbidden'

export const REMOVE_COMMON_DOCUMENTATION = (
  entityName: string,
  responses: ApiResponseOptions[]
): IDocumentation => ({
  operation: { summary: `Deleting ${entityName}.` },
  responses: [
    { status: HttpStatus.NO_CONTENT },
    UNAUTHORIZED_RESPONSE,
    FORBIDDEN_RESPONSE,
    ...responses,
  ],
})
