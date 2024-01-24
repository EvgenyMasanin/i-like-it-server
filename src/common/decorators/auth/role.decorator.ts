import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { RoleGuard } from '../../guards/role.guard'

export const ROLES_KEY = 'role'

export enum BasicRole {
  user = 'User',
  guest = 'Guest',
  admin = 'Admin',
}

const SetRole = (roles: string[]) => SetMetadata(ROLES_KEY, roles)

export const Role = (...roles: string[]) => applyDecorators(UseGuards(RoleGuard), SetRole(roles))
