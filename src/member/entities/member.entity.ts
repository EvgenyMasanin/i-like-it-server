import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { IsString } from 'class-validator'
import { User } from 'src/user/entities/user.entity'
import { Category } from 'src/categories/entities/category.entity'
import { Characteristic } from 'src/characteristic/entities/characteristic.entity'

import { MemberGallery } from './member-gallery.entity'

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 42 })
  id: number

  @Column()
  @ApiProperty({ example: 'Apple' })
  @IsString()
  name: string

  @Column()
  @ApiProperty({ example: 'Apple it is a fruit.' })
  @IsString()
  description: string

  @Column()
  @ApiProperty({ example: 42 })
  categoryId: number

  @Column()
  @ApiProperty({ example: 42 })
  authorId: number

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, (category) => category.members)
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.categoryMembers)
  @JoinColumn({ name: 'authorId' })
  author: User

  @OneToMany(() => Characteristic, (characteristic) => characteristic.member)
  @ApiProperty({ type: [Characteristic] })
  characteristics: Characteristic[]

  @OneToMany(() => MemberGallery, (memberGallery) => memberGallery.member, { eager: true })
  @ApiProperty({ type: [MemberGallery] })
  gallery: MemberGallery[]
}
