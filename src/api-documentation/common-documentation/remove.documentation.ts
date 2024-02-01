import { ApiResponseOptions } from '@nestjs/swagger'

import { IDocumentation } from '../decorators'
import { FORBIDDEN_RESPONSE, NO_CONTENT_RESPONSE, UNAUTHORIZED_RESPONSE } from '../responses'

export const REMOVE_COMMON_DOCUMENTATION = (
  entityName: string,
  ...responses: ApiResponseOptions[]
): IDocumentation => ({
  operation: { summary: `Deleting ${entityName}.` },
  responses: [NO_CONTENT_RESPONSE, UNAUTHORIZED_RESPONSE, FORBIDDEN_RESPONSE, ...responses],
})
