import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { IsEmail, IsString, Matches } from 'class-validator'
import { Role } from 'src/role/entities/role.entity'
import { Member } from 'src/member/entities/member.entity'
import { Category } from 'src/categories/entities/category.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 42 })
  id: number

  @Column({ unique: true })
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail({}, { message: 'Email must be valid!' })
  email: string

  @Column({ unique: true })
  @ApiProperty({ example: 'testUsername' })
  @IsString()
  @Matches(/^[a-zA-Z\\s]+$/, { each: true })
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
}
