import { HttpStatus } from '@nestjs/common'
import { ApiResponseOptions } from '@nestjs/swagger'

import { Constructor } from 'src/common/interfaces'

import { IDocumentation } from '../decorators'
import { FORBIDDEN_RESPONSE, UNAUTHORIZED_RESPONSE } from '../responses'

export const UPDATE_COMMON_DOCUMENTATION = <T extends Constructor>(
  entityName: string,
  entity: T,
  ...responses: ApiResponseOptions[]
): IDocumentation => ({
  operation: { summary: `Updating ${entityName}.` },
  responses: [
    { status: HttpStatus.OK, type: entity },
    UNAUTHORIZED_RESPONSE,
    FORBIDDEN_RESPONSE,
    ...responses,
  ],
})
