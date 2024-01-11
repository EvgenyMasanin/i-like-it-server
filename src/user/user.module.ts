import { HashModule } from 'src/hash/hash.module'
import { RoleModule } from 'src/role/role.module'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), RoleModule, HashModule],
  exports: [UserService],
})
export class UserModule {}
