import { HttpStatus } from '@nestjs/common'

import { FILE_SCHEMA, UNAUTHORIZED_RESPONSE } from 'src/api-documentation'
import {
  CREATE_COMMON_DOCUMENTATION,
  FIND_ALL_COMMON_DOCUMENTATION,
  FIND_ONE_COMMON_DOCUMENTATION,
  REMOVE_COMMON_DOCUMENTATION,
  UPDATE_COMMON_DOCUMENTATION,
} from 'src/api-documentation/common-documentation'
import { IApiDocumentation } from 'src/api-documentation/decorators'
import { NOT_FOUND_RESPONSE } from 'src/api-documentation/responses/not-found'

import { MemberGallery } from '../entities'
import { MemberDto } from '../dto/member.dto'

const NOT_FOUND_MEMBER_RESPONSE = NOT_FOUND_RESPONSE('member')

export const CREATE_MEMBER_DOCUMENTATION: IApiDocumentation = CREATE_COMMON_DOCUMENTATION({
  entityName: 'member',
  entity: MemberDto,
  responses: [NOT_FOUND_RESPONSE('category')],
})

export const UPLOAD_GALLERY_DOCUMENTATION: IApiDocumentation = {
  operation: { summary: 'Uploading members gallery.' },
  consumes: 'multipart/form-data',
  body: {
    description: 'Images in jpg format.',
    schema: FILE_SCHEMA,
  },
  responses: [
    {
      status: HttpStatus.CREATED,
      type: [MemberGallery],
    },
    UNAUTHORIZED_RESPONSE,
    NOT_FOUND_MEMBER_RESPONSE,
  ],
}

export const LIKE_DOCUMENTATION: IApiDocumentation = {
  operation: { summary: 'Set or unset like.' },
  responses: [
    {
      status: HttpStatus.OK,
      type: MemberDto,
    },
    UNAUTHORIZED_RESPONSE,
    NOT_FOUND_MEMBER_RESPONSE,
  ],
}

export const FIND_ALL_DOCUMENTATION: IApiDocumentation = FIND_ALL_COMMON_DOCUMENTATION({
  entity: MemberDto,
  entityName: 'member',
})

export const FIND_ONE_DOCUMENTATION: IApiDocumentation = FIND_ONE_COMMON_DOCUMENTATION({
  entity: MemberDto,
  entityName: 'member',
})

export const UPDATE_DOCUMENTATION: IApiDocumentation = UPDATE_COMMON_DOCUMENTATION({
  entityName: 'member',
  entity: MemberDto,
})

export const REMOVE_DOCUMENTATION: IApiDocumentation = REMOVE_COMMON_DOCUMENTATION({
  entityName: 'member',
})
