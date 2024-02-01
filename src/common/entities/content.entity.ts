import { Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { IsValidString } from 'src/validation/strings'

import { IdAndName } from './id-and-name.entity'

export abstract class Content extends IdAndName {
  @Column()
  @IsValidString()
  @ApiProperty({ example: 'Some description' })
  description: string
}
