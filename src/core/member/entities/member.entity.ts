import {
  AfterInsert,
  AfterLoad,
  AfterRecover,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { Transform } from 'class-transformer'
import { Content } from 'src/common/entities'
import { User } from 'src/core/user/entities/user.entity'
import { Category } from 'src/core/categories/entities/category.entity'
import { Characteristic } from 'src/core/characteristic/entities/characteristic.entity'

import { MemberGallery } from './member-gallery.entity'

@Entity()
export class Member extends Content {
  @Column()
  @ApiProperty({ example: 42 })
  categoryId: number

  @Column()
  @ApiProperty({ example: 42 })
  authorId: number

  @ManyToOne(() => Category, (category) => category.members, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  @ApiProperty({ type: () => Category })
  category: Category

  @ManyToOne(() => User, (user) => user.categoryMembers, { eager: true })
  @JoinColumn({ name: 'authorId' })
  @ApiProperty({ type: () => User })
  author: User

  @OneToMany(() => Characteristic, (characteristic) => characteristic.member, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: [Characteristic] })
  characteristics: Characteristic[]

  @OneToMany(() => MemberGallery, (memberGallery) => memberGallery.member, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: [MemberGallery] })
  gallery: MemberGallery[]

  @Transform(({ value }: { value: User[] }) => value.map(({ id }) => id))
  @ManyToMany(() => User, (user) => user.likesMembers, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @ApiProperty({ type: [Number], example: [14, 42] })
  usersLikesIds: User[]

  @ApiProperty({ example: 2 })
  likesCount: number

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  @AfterRecover()
  updateCoverPhotoLink() {
    this.likesCount = this.usersLikesIds.length
  }
}
