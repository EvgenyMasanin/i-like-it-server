import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ExceptionModule } from 'src/exception/exception.module'

import { CharacteristicService } from './characteristic.service'
import { Characteristic } from './entities/characteristic.entity'

@Module({
  controllers: [],
  providers: [CharacteristicService],
  imports: [TypeOrmModule.forFeature([Characteristic]), ExceptionModule],
  exports: [CharacteristicService],
})
export class CharacteristicModule {}
