import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from 'src/core/user/user.module'
import { ExceptionModule } from 'src/exception/exception.module'
import { CategoriesModule } from 'src/core/categories/categories.module'
import { CharacteristicModule } from 'src/core/characteristic/characteristic.module'

import { MemberService } from './member.service'
import { MemberController } from './member.controller'
import { Member } from './entities/member.entity'
import { MemberGallery } from './entities/member-gallery.entity'

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [
    CharacteristicModule,
    UserModule,
    ExceptionModule,
    CategoriesModule,
    TypeOrmModule.forFeature([Member, MemberGallery]),
  ],
})
export class MemberModule {}
