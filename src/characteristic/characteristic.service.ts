import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Member } from 'src/member/entities/member.entity'
import { ExceptionService } from 'src/exception/exception.service'

import { Characteristic } from './entities/characteristic.entity'
import { CreateCharacteristicDto } from './dto/create-characteristic.dto'

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectRepository(Characteristic)
    private readonly characteristicRepository: Repository<Characteristic>,
    private readonly exceptionService: ExceptionService
  ) {}

  async create(member: Member, createCharacteristicDto: CreateCharacteristicDto) {
    const newCharacteristic = this.characteristicRepository.create(createCharacteristicDto)
    newCharacteristic.member = member

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { member: _, ...characteristic } = await this.characteristicRepository.save(
      newCharacteristic
    )

    return characteristic
  }
}
