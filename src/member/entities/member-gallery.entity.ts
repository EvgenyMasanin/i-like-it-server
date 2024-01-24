import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Member } from './member.entity'

@Entity()
export class MemberGallery {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 42 })
  id: number

  @Column()
  @ApiProperty({ example: 'member-images/d0483dcc4833f38277059b214ed7e108f.jpg' })
  imageUrl: string

  @Column()
  @ApiProperty({ example: true })
  isMain: boolean

  @ManyToOne(() => Member, (member) => member.characteristics)
  member: Member
}
