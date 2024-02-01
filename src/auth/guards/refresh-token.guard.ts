import { AuthGuard } from '@nestjs/passport'

import { JwtStrategies } from '../strategies/jwt-strategies.enum'

export class RefreshTokenGuard extends AuthGuard(JwtStrategies.JWT_REFRESH) {
  constructor() {
    super()
  }
}
