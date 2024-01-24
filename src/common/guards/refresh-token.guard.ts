import { AuthGuard } from '@nestjs/passport'

import { JwtStrategies } from '../interfaces'

export class RefreshTokenGuard extends AuthGuard(JwtStrategies.JWT_REFRESH) {
  constructor() {
    super()
  }
}
