import { HttpStatus } from '@nestjs/common'
import { ApiResponseOptions } from '@nestjs/swagger'

import { Constructor } from 'src/common/interfaces'

import { IApiDocumentation } from '../decorators'
import { NOT_FOUND_RESPONSE } from '../responses/not-found'
import { FORBIDDEN_RESPONSE, UNAUTHORIZED_RESPONSE } from '../responses'

interface IUpdateCommonDocumentation {
  entity: Constructor
  entityName: string
  responses?: ApiResponseOptions[]
}

export const UPDATE_COMMON_DOCUMENTATION = ({
  entity,
  entityName,
  responses = [],
}: IUpdateCommonDocumentation): IApiDocumentation => ({
  operation: { summary: `Updating ${entityName}.` },
  responses: [
    {
      status: HttpStatus.OK,
      type: entity,
    },
    NOT_FOUND_RESPONSE(entityName),
    FORBIDDEN_RESPONSE,
    UNAUTHORIZED_RESPONSE,
    ...responses,
  ],

  isBearerAuth: true,
})
