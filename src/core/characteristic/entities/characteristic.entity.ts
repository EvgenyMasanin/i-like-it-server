import { Column, Entity, ManyToOne } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { Exclude } from 'class-transformer'
import { IdAndName } from 'src/common/entities'
import { IsNumber, Max, Min } from 'class-validator'
import { Member } from 'src/core/member/entities'

@Entity()
export class Characteristic extends IdAndName {
  @Column()
  @ApiProperty({ example: 4 })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number

  @Exclude()
  @ManyToOne(() => Member, (member) => member.characteristics, { onDelete: 'CASCADE' })
  member: Member
}
