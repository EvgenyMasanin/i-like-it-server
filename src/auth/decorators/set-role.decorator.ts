import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { RoleGuard } from '../guards'

export const ROLES_KEY = 'role'

export enum BasicRole {
  user = 'User',
  guest = 'Guest',
  admin = 'Admin',
}

export const SetRole = (...roles: string[]) =>
  applyDecorators(UseGuards(RoleGuard), SetMetadata(ROLES_KEY, roles))
