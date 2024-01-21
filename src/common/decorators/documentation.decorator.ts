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
} from '@nestjs/swagger'
import { applyDecorators } from '@nestjs/common'

export interface IDocumentation {
  operation?: ApiOperationOptions
  body?: ApiBodyOptions
  responses?: ApiResponseOptions[]
  headers?: ApiHeaderOptions[]
  consumes?: string | string[]
}

export const Documentation = ({
  body,
  operation,
  responses,
  headers,
  consumes,
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

  return applyDecorators(...decorators)
}
