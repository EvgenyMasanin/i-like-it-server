import { applyDecorators } from '@nestjs/common'
import {
  ApiBody,
  ApiBodyOptions,
  ApiHeader,
  ApiHeaderOptions,
  ApiOperation,
  ApiOperationOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger'

interface IDocumentation {
  operation?: ApiOperationOptions
  body?: ApiBodyOptions
  responses?: ApiResponseOptions[]
  headers?: ApiHeaderOptions[]
}

export const Documentation = ({ body, operation, responses, headers }: IDocumentation) => {
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

  return applyDecorators(...decorators)
}
