import { Reflector } from '@nestjs/core'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

import { map, Observable } from 'rxjs'

import { isPagination, WithPagination } from './model'
import { OneOrMore } from './interfaces/one-or-more.type'
import { EXCLUDE_TRANSFORM_TO_RESPONSE_DTO } from './exclude-transform-to-response-dto.decorator'

type MapperFunction<T, U> = (entity: T) => U

type Response<T> = OneOrMore<T> | WithPagination<T>

@Injectable()
export class TransformToResponseDtoInterceptor<ToTransform, Transformed>
  implements NestInterceptor<Response<ToTransform>, Response<ToTransform | Transformed>>
{
  constructor(private readonly mapper: MapperFunction<ToTransform, Transformed>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<Response<ToTransform>>
  ): Observable<Response<ToTransform | Transformed>> {
    const excludeTransformToResponseDto = new Reflector().getAllAndOverride(
      EXCLUDE_TRANSFORM_TO_RESPONSE_DTO,
      [context.getHandler(), context.getClass()]
    )
    if (excludeTransformToResponseDto) return next.handle().pipe()

    return next.handle().pipe(
      map((response) => {
        return isPagination(response)
          ? { ...response, data: mapResponse(response.data, this.mapper) }
          : mapResponse(response, this.mapper)
      })
    )
  }
}

function mapResponse<ToTransform, Transformed>(
  response: OneOrMore<ToTransform>,
  mapper: MapperFunction<ToTransform, Transformed>
) {
  return Array.isArray(response) ? response.map((entity) => mapper(entity)) : mapper(response)
}
