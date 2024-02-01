import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { ExceptionService } from 'src/exception/exception.service'
import { Member } from 'src/core/member/entities/member.entity'

import { Characteristic } from './entities/characteristic.entity'
import { CreateCharacteristicDto } from './dto/create-characteristic.dto'

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectRepository(Characteristic)
    private readonly characteristicRepository: Repository<Characteristic>,
    private readonly exceptionService: ExceptionService
  ) {}

  async create(memberId: number, createCharacteristicDto: CreateCharacteristicDto) {
    const newCharacteristic = this.characteristicRepository.create({
      member: { id: memberId },
      ...createCharacteristicDto,
    })

    return await this.characteristicRepository.save(newCharacteristic)
  }

  createMany(member: Member, createCharacteristicsDto: CreateCharacteristicDto[]) {
    return Promise.all(
      createCharacteristicsDto.map((characteristicDto) => this.create(member.id, characteristicDto))
    )
  }
}
