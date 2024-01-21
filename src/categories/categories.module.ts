import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NestjsFormDataModule } from 'nestjs-form-data'

import { UserModule } from 'src/user/user.module'

import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'
import { CategoriesController } from './categories.controller'

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([Category]), UserModule, NestjsFormDataModule],
})
export class CategoriesModule {}
