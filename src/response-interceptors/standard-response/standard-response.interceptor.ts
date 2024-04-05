import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

import { map, Observable } from 'rxjs'

interface StandardResponse<T> {
  statusCode: number
  response: T
}

@Injectable()
export class StandardResponseInterceptor<ToTransform, Transformed>
  implements NestInterceptor<ToTransform, StandardResponse<ToTransform | Transformed>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<ToTransform>
  ): Observable<StandardResponse<ToTransform | Transformed>> {
    const statusCode = context.switchToHttp().getResponse().statusCode as number

    return next.handle().pipe(map((response) => ({ statusCode, response })))
  }
}
