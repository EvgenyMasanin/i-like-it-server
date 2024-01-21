import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { IsString } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 42 })
  id: number

  @Column()
  @ApiProperty({ example: 'Fruit' })
  @IsString()
  name: string

  @Column()
  @ApiProperty({ example: 'Category about fruits.' })
  @IsString()
  description: string

  @Column()
  @ApiProperty({ example: 'category-images\\d0483dcc4833f38277059b214ed7e108f.jpg' })
  imageUrl: string

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.categories, { nullable: true, eager: true })
  author: User
}
