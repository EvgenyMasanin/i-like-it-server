import {
  ApiBody,
  ApiBodyOptions,
  ApiConsumes,
  ApiHeader,
  ApiHeaderOptions,
  ApiOperation,
  ApiOperationOptions,
  ApiResponse,
  ApiResponseOptions,
  ApiTags,
} from '@nestjs/swagger'
import { applyDecorators } from '@nestjs/common'

import { ApiTag } from 'src/api-documentation/tags/api-tag.enum'

export interface IDocumentation {
  operation?: ApiOperationOptions
  body?: ApiBodyOptions
  responses?: ApiResponseOptions[]
  headers?: ApiHeaderOptions[]
  consumes?: string | string[]
  tags?: ApiTag[]
}

export const Documentation = ({
  body,
  operation,
  responses,
  headers,
  consumes,
  tags = [ApiTag.auth],
}: IDocumentation) => {
  const decorators = []

  if (body) {
    decorators.push(ApiBody(body))
  }
  if (operation) {
    decorators.push(ApiOperation(operation))
  }
  if (responses) {
    decorators.push(...responses.map((response) => ApiResponse(response)))
  }
  if (headers) {
    decorators.push(...headers.map((header) => ApiHeader(header)))
  }
  if (consumes) {
    if (Array.isArray(consumes)) decorators.push(ApiConsumes(...consumes))
    else decorators.push(ApiConsumes(consumes))
  }
  if (tags) {
    tags.forEach((tag) => decorators.push(ApiTags(tag)))
  }

  return applyDecorators(...decorators)
}
