import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { IsNumber, IsString, Max, Min } from 'class-validator'
import { Member } from 'src/member/entities/member.entity'

@Entity()
export class Characteristic {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 42 })
  id: number

  @Column()
  @ApiProperty({ example: 'Color' })
  @IsString()
  name: string

  @Column()
  @ApiProperty({ example: 4 })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number

  @ManyToOne(() => Member, (member) => member.characteristics)
  member: Member
}
