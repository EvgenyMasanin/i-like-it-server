import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'

import { HashModule } from 'src/hash/hash.module'
import { FileModule } from 'src/file/file.module'
import { RoleModule } from 'src/core/role/role.module'
import { UserModule } from 'src/core/user/user.module'
import { AtJwtStrategy, RtJwtStrategy } from 'src/auth/strategies'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  controllers: [AuthController],
  providers: [AuthService, RtJwtStrategy, AtJwtStrategy],
  imports: [UserModule, HashModule, RoleModule, JwtModule.register({}), FileModule],
})
export class AuthModule {}
