import { HttpStatus } from '@nestjs/common'
import { ApiResponseOptions } from '@nestjs/swagger'

import { Constructor } from 'src/common/interfaces'

import { IApiDocumentation } from '../decorators'
import { INVALID_DTO_RESPONSE, UNAUTHORIZED_RESPONSE } from '../responses'

interface ICreateCommonDocumentation {
  entity: Constructor
  entityName: string
  responses?: ApiResponseOptions[]
}

export const CREATE_COMMON_DOCUMENTATION = ({
  entity,
  entityName,
  responses = [],
}: ICreateCommonDocumentation): IApiDocumentation => ({
  operation: { summary: `Creating new ${entityName}.` },
  responses: [
    {
      status: HttpStatus.CREATED,
      type: entity,
      description: `New ${entityName} has been created successfully.`,
    },
    INVALID_DTO_RESPONSE,
    UNAUTHORIZED_RESPONSE,
    ...responses,
  ],
  isBearerAuth: true,
})
