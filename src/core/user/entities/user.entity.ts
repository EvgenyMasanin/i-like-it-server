import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'

import { IsEmail } from 'class-validator'
import { Id } from 'src/common/entities'
import { IsName } from 'src/validation/strings'
import { Role } from 'src/core/role/entities/role.entity'
import { Member } from 'src/core/member/entities/member.entity'
import { Category } from 'src/core/categories/entities/category.entity'

@Entity()
export class User extends Id {
  @Column({ unique: true })
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail({}, { message: 'Email must be valid!' })
  email: string

  @Column({ unique: true })
  @ApiProperty({ example: 'testUsername' })
  @IsName()
  username: string

  @ApiProperty({ example: 'avatars/3ae56ab5926a103d49072e76cd288ae28.jpg' })
  @Column({ nullable: true })
  avatarURL?: string

  @ApiProperty({ type: [Role] })
  @ManyToMany(() => Role, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  roles: Role[]

  @OneToMany(() => Category, (category) => category.author)
  categories: Category[]

  @OneToMany(() => Member, (member) => member.author)
  categoryMembers: Member[]

  @Column({ select: false })
  password: string

  @Column({ nullable: true, select: false })
  refreshToken: string

  @ManyToMany(() => Member, (member) => member.usersLikesIds)
  @JoinTable()
  likesMembers: Member[]
}
