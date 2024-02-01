import { ApiResponseOptions } from '@nestjs/swagger'

import { IDocumentation } from '../decorators'
import { FORBIDDEN_RESPONSE, NO_CONTENT_RESPONSE, UNAUTHORIZED_RESPONSE } from '../responses'

export const UPDATE_COMMON_DOCUMENTATION = (
  entityName: string,
  ...responses: ApiResponseOptions[]
): IDocumentation => ({
  operation: { summary: `Updating ${entityName}.` },
  responses: [NO_CONTENT_RESPONSE, UNAUTHORIZED_RESPONSE, FORBIDDEN_RESPONSE, ...responses],
})
