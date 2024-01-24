import { HttpStatus, Type } from '@nestjs/common'
import { ApiResponseOptions } from '@nestjs/swagger'

import { IDocumentation } from 'src/common/decorators'

import { ApiTag } from '../tags'

export const FIND_ALL_COMMON_DOCUMENTATION = <T extends Function | Type<unknown>>(
  entity: T,
  entityName: string,
  responses = [] as ApiResponseOptions[]
): IDocumentation => ({
  operation: { summary: `Finding all ${entityName}.` },
  responses: [{ status: HttpStatus.OK, type: [entity] }, ...responses],
  tags: [ApiTag.public],
})
