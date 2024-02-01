import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { TokensPayload } from 'src/auth/dto/tokens.dto'

export const GetCurrentUser = createParamDecorator(
  (data: (keyof TokensPayload) | undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest()
    if (!data) return request.user

    return request.user[data]
  }
)
