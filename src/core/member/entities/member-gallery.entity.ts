import { Column, Entity, ManyToOne } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { Id } from 'src/common/entities'
import { Exclude } from 'class-transformer'

import { Member } from './member.entity'

@Entity()
export class MemberGallery extends Id {
  @Column()
  @ApiProperty({ example: 'member-images/d0483dcc4833f38277059b214ed7e108f.jpg' })
  imageUrl: string

  @Column()
  @ApiProperty({ example: true })
  isMain: boolean

  @Exclude()
  @ManyToOne(() => Member, (member) => member.characteristics, { onDelete: 'CASCADE' })
  member: Member
}
