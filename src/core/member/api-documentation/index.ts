import { HttpStatus } from '@nestjs/common'

import {
  ApiTag,
  FILE_SCHEMA,
  NOT_EXISTING_ENTITY_RESPONSE,
  UNAUTHORIZED_RESPONSE,
} from 'src/api-documentation'
import {
  FIND_ALL_COMMON_DOCUMENTATION,
  FIND_ONE_COMMON_DOCUMENTATION,
  REMOVE_COMMON_DOCUMENTATION,
  UPDATE_COMMON_DOCUMENTATION,
} from 'src/api-documentation/common-documentation'
import { IDocumentation } from 'src/api-documentation/decorators'
import { WithPagination } from 'src/response-interceptors/transform-to-response-dto/model/with-pagination.class'

import { MemberGallery } from '../entities'
import { MemberDto } from '../dto/member.dto'

const NOT_EXISTING_MEMBER_RESPONSE = NOT_EXISTING_ENTITY_RESPONSE('category')

export const CREATE_MEMBER_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Creating new category member.' },
  responses: [
    {
      status: HttpStatus.CREATED,
      type: MemberDto,
    },
    UNAUTHORIZED_RESPONSE,
    NOT_EXISTING_MEMBER_RESPONSE,
  ],
}

export const UPLOAD_GALLERY_DOCUMENTATION: IDocumentation = {
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
    NOT_EXISTING_MEMBER_RESPONSE,
  ],
}

export const FIND_ALL_DOCUMENTATION: IDocumentation = FIND_ALL_COMMON_DOCUMENTATION(
  WithPagination(MemberDto),
  'member'
)

export const FIND_ALL_BY_FILTER_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Finding all members by filter.' },
  responses: [{ status: HttpStatus.OK, type: WithPagination(MemberDto) }],
  tags: [ApiTag.public],
}

export const FIND_ONE_DOCUMENTATION: IDocumentation = FIND_ONE_COMMON_DOCUMENTATION(
  MemberDto,
  'member',
  NOT_EXISTING_MEMBER_RESPONSE
)

export const UPDATE_DOCUMENTATION: IDocumentation = UPDATE_COMMON_DOCUMENTATION(
  'member',
  NOT_EXISTING_MEMBER_RESPONSE
)

export const REMOVE_DOCUMENTATION: IDocumentation = REMOVE_COMMON_DOCUMENTATION(
  'member',
  NOT_EXISTING_MEMBER_RESPONSE
)
