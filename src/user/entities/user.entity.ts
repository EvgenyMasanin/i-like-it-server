import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Role } from 'src/role/entities/role.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  avatarURL?: string

  @ManyToMany(() => Role, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  roles: Role[]

  @Column({select: false})
  password: string

  @Column({ nullable: true, select: false })
  refreshToken: string
}
