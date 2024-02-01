import { applyDecorators, Injectable, UseInterceptors } from '@nestjs/common'

import { TransformToResponseDtoInterceptor } from 'src/response-interceptors/transform-to-response-dto'
import { extractAuthorData } from 'src/response-interceptors/transform-to-response-dto/mappers'

import { Member } from '../entities'
import { MemberDto } from '../dto/member.dto'

function memberMapper(member: Member): MemberDto {
  const {
    category: { name },
    ...memberDto
  } = extractAuthorData(member)

  return { ...memberDto, categoryName: name }
}

@Injectable()
class TransformToMemberDtoInterceptor extends TransformToResponseDtoInterceptor<Member, MemberDto> {
  constructor() {
    super(memberMapper)
  }
}

export const TransformToMemberDto = () =>
  applyDecorators(UseInterceptors(TransformToMemberDtoInterceptor))
