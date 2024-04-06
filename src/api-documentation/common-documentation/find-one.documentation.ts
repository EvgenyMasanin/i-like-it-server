import { HttpStatus } from '@nestjs/common'
import { ApiResponseOptions } from '@nestjs/swagger'

import { Constructor } from 'src/common/interfaces'

import { IApiDocumentation } from '../decorators'
import { ApiTag } from '../tags/api-tag.enum'
import { NOT_FOUND_RESPONSE } from '../responses/not-found'

interface IUpdateCommonDocumentation {
  entity: Constructor
  entityName: string
  responses?: ApiResponseOptions[]
}

export const FIND_ONE_COMMON_DOCUMENTATION = ({
  entity,
  entityName,
  responses = [],
}: IUpdateCommonDocumentation): IApiDocumentation => ({
  operation: { summary: `Updating ${entityName} by id.` },
  responses: [
    { status: HttpStatus.OK, type: entity },
    NOT_FOUND_RESPONSE(entityName),
    ...responses,
  ],
  tags: [ApiTag.public],
})
