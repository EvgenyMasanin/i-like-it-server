import { ApiProperty } from '@nestjs/swagger'

import { Member } from '../entities/member.entity'

export class MemberDto extends Member {
  @ApiProperty({ example: 'avatars/3ae56ab5926a103d49072e76cd288ae28.jpg' })
  authorImgSrc: string
}
