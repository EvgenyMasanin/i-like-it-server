import { AtJwtStrategy, RtJwtStrategy } from 'src/common/strategies'
import { HashModule } from 'src/hash/hash.module'
import { RoleModule } from 'src/role/role.module'
import { UserModule } from 'src/user/user.module'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, RtJwtStrategy, AtJwtStrategy, ConfigService,ConfigService],
  imports: [UserModule, HashModule, RoleModule, JwtModule.register({}), ConfigModule],
})
export class AuthModule {}
