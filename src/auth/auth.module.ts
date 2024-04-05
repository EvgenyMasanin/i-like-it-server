import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'

import { MicroService } from 'src/rmq'
import { RmqModule } from 'src/rmq/rmq.module'
import { HashModule } from 'src/hash/hash.module'
import { FileModule } from 'src/file/file.module'
import { MailModule } from 'src/mail/mail.module'
import { RoleModule } from 'src/core/role/role.module'
import { UserModule } from 'src/core/user/user.module'
import { AtJwtStrategy, RtJwtStrategy } from 'src/auth/strategies'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  controllers: [AuthController],
  imports: [UserModule, HashModule, RoleModule, JwtModule.register({}), FileModule, MailModule],
  providers: [AuthService, RtJwtStrategy, AtJwtStrategy],
})
export class AuthModule {}
