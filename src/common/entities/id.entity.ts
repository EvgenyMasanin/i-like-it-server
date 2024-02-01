import { PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

export abstract class Id {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 'Some positive number' })
  id: number
}
