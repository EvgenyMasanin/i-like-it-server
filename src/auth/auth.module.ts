import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { HashModule } from 'src/hash/hash.module'
import { RoleModule } from 'src/role/role.module'
import { UserModule } from 'src/user/user.module'
import { FileModule } from 'src/file/file.module'
import { AtJwtStrategy, RtJwtStrategy } from 'src/common/strategies'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  controllers: [AuthController],
  providers: [AuthService, RtJwtStrategy, AtJwtStrategy],
  imports: [UserModule, HashModule, RoleModule, JwtModule.register({}), ConfigModule, FileModule],
})
export class AuthModule {}
