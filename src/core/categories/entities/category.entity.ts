import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import { Exclude } from 'class-transformer'
import { Content } from 'src/common/entities'
import { User } from 'src/core/user/entities/user.entity'
import { Member } from 'src/core/member/entities/member.entity'

@Entity()
export class Category extends Content {
  @Column()
  @ApiProperty({ example: 'category-images\\d0483dcc4833f38277059b214ed7e108f.jpg' })
  imageUrl: string

  @Column()
  @ApiProperty()
  authorId: number

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.categories, { nullable: true, eager: true })
  @JoinColumn({ name: 'authorId' })
  author: User

  @OneToMany(() => Member, (member) => member.category)
  members: Member[]
}
