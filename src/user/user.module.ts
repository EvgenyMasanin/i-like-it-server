import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { HashModule } from 'src/hash/hash.module'
import { RoleModule } from 'src/role/role.module'
import { FileModule } from 'src/file/file.module'
import { ExceptionModule } from 'src/exception/exception.module'

import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), RoleModule, HashModule, FileModule, ExceptionModule],
  exports: [UserService],
})
export class UserModule {}
