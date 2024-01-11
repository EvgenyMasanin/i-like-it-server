import { Role } from 'src/role/entities/role.entity'
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  refreshToken: string

  @ManyToMany(() => Role, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  roles: Role[]
}
