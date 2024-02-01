import { Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { IsName } from 'src/validation/strings'

import { Id } from './id.entity'

export abstract class IdAndName extends Id {
  @Column()
  @IsName()
  @ApiProperty({ example: 'Some name' })
  name: string
}
