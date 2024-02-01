import { HttpStatus, Type } from '@nestjs/common'
import { ApiResponseOptions } from '@nestjs/swagger'

import { IDocumentation } from '../decorators'
import { ApiTag } from '../tags/api-tag.enum'

export const FIND_ONE_COMMON_DOCUMENTATION = <T extends Function | Type<unknown>>(
  entity: T,
  entityName: string,
  ...responses: ApiResponseOptions[]
): IDocumentation => ({
  operation: { summary: `Finding ${entityName} by id.` },
  responses: [{ status: HttpStatus.OK, type: entity }, ...responses],
  tags: [ApiTag.public],
})
