import { HttpStatus } from '@nestjs/common'
import { ApiResponseOptions } from '@nestjs/swagger'

import { IApiDocumentation } from '../decorators'
import { NOT_FOUND_RESPONSE } from '../responses/not-found'
import { FORBIDDEN_RESPONSE, UNAUTHORIZED_RESPONSE } from '../responses'

interface IRemoveCommonDocumentation {
  entityName: string
  responses?: ApiResponseOptions[]
}

export const REMOVE_COMMON_DOCUMENTATION = ({
  entityName,
  responses = [],
}: IRemoveCommonDocumentation): IApiDocumentation => ({
  operation: { summary: `Deleting ${entityName}.` },
  responses: [
    { status: HttpStatus.OK, type: Boolean },
    FORBIDDEN_RESPONSE,
    UNAUTHORIZED_RESPONSE,
    NOT_FOUND_RESPONSE(entityName),
    ...responses,
  ],
  isBearerAuth: true,
})
