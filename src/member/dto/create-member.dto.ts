import { ApiProperty, PickType } from '@nestjs/swagger'

import { IsNumber, IsPositive } from 'class-validator'
import { CreateCharacteristicDto } from 'src/characteristic/dto/create-characteristic.dto'

import { Member } from '../entities/member.entity'

export class CreateMemberDto extends PickType(Member, ['name', 'description'] as const) {
  authorId: number

  // imageUrl: string

  @ApiProperty({ example: 42 })
  @IsNumber()
  @IsPositive()
  categoryId: number

  // @ApiProperty({ type: 'filename.jpg' })
  // memberImage: Express.Multer.File

  @ApiProperty({ type: JSON.stringify([CreateCharacteristicDto]) })
  characteristics: CreateCharacteristicDto[]
}
