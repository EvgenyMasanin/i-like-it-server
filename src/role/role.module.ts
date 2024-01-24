import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ExceptionModule } from 'src/exception/exception.module'

import { RoleService } from './role.service'
import { Role } from './entities/role.entity'
import { RoleController } from './role.controller'

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role]), ExceptionModule],
  exports: [RoleService],
})
export class RoleModule {}
