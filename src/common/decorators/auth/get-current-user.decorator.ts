import { TokensPayload } from 'src/auth/dto/tokens.dto'

import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetCurrentUser = createParamDecorator(
  (data: (keyof TokensPayload) | undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest()
    if (!data) return request.user

    console.log("🚀 ~ request.user:", request.user)
    return request.user[data]
  }
)
