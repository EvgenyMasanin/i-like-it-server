import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Role {
  @ApiProperty({type: 'number'})
  @PrimaryGeneratedColumn()
  id: number
  
  @ApiProperty({type: 'string'})
  @Column({ unique: true })
  name: string
  
  @ApiProperty({type: 'string'})
  @Column()
  description: string
}
