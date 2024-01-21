import { Reflector } from '@nestjs/core'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { Observable } from 'rxjs'
import { TokensPayload } from 'src/auth/dto/tokens.dto'

import { ROLES_KEY } from '../decorators/role.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) return true

    const req = context.switchToHttp().getRequest<{ user: TokensPayload }>()

    const { roles } = req.user

    return roles.some((role) => requiredRoles.includes(role))
  }
}
