import { AuthGuard } from '@nestjs/passport'

import { JwtStrategies } from '../types'

export class RefreshTokenGuard extends AuthGuard(JwtStrategies.JWT_REFRESH) {
  constructor() {
    super()
  }
}
