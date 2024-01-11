import { Observable } from 'rxjs'
import { Role } from 'src/role/entities/role.entity'

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { ROLES_KEY } from '../decorators/role.decorator'
import { JwtPayload } from '../types'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) return true

    const req = context.switchToHttp().getRequest<{user:JwtPayload}>()

    const { roles } = req.user

    return roles.some((role) => requiredRoles.includes(role))
  }
}
