import {
  ApiBearerAuth,
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

export interface IApiDocumentation {
  operation?: ApiOperationOptions
  body?: ApiBodyOptions
  responses?: ApiResponseOptions[]
  headers?: ApiHeaderOptions[]
  consumes?: string | string[]
  tags?: ApiTag[]
  isBearerAuth?: boolean
}

export const ApiDocumentation = ({
  body,
  operation,
  responses,
  headers,
  consumes,
  tags = [ApiTag.auth],
  isBearerAuth,
}: IApiDocumentation) => {
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
  if (isBearerAuth) {
    decorators.push(ApiBearerAuth())
  }

  return applyDecorators(...decorators)
}
