import { ApiProperty, PickType } from '@nestjs/swagger'

import { IsNumber, IsPositive } from 'class-validator'
import { CreateCharacteristicDto } from 'src/core/characteristic/dto/create-characteristic.dto'

import { Member } from '../entities/member.entity'

export class CreateMemberDto extends PickType(Member, ['name', 'description'] as const) {
  authorId: number

  @ApiProperty({ example: 42 })
  @IsNumber()
  @IsPositive()
  categoryId: number

  @ApiProperty({ type: [CreateCharacteristicDto] })
  characteristics: CreateCharacteristicDto[]
}
