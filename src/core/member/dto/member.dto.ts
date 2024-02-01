import { ApiProperty, OmitType } from '@nestjs/swagger'

import { AuthorInfo } from 'src/response-interceptors/transform-to-response-dto/model'

import { Member } from '../entities/member.entity'

export class MemberDto extends AuthorInfo(OmitType(Member, ['author', 'category'] as const)) {
  @ApiProperty({ example: 'Fruits' })
  categoryName: string
}
