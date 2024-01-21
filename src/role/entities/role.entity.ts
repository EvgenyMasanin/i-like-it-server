import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Role {
  @ApiProperty({example: 42})
  @PrimaryGeneratedColumn()
  id: number
  
  @ApiProperty({example: 'Admin'})
  @Column({ unique: true })
  name: string
  
  @ApiProperty({example: 'Role with full access'})
  @Column()
  description: string
}
