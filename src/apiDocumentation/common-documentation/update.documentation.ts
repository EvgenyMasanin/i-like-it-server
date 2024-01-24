import { HttpStatus, Type } from '@nestjs/common'
import { ApiResponseOptions } from '@nestjs/swagger'

import { IDocumentation } from 'src/common/decorators'

import { UNAUTHORIZED_RESPONSE } from '../responses'
import { FORBIDDEN_RESPONSE } from '../responses/forbidden'

export const UPDATE_COMMON_DOCUMENTATION = <T extends Function | Type<unknown>>(
  entity: T,
  entityName: string,
  responses: ApiResponseOptions[]
): IDocumentation => ({
  operation: { summary: `Updating ${entityName}.` },
  responses: [
    { status: HttpStatus.OK, type: entity },
    UNAUTHORIZED_RESPONSE,
    FORBIDDEN_RESPONSE,
    ...responses,
  ],
})
