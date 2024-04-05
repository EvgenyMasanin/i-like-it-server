import { HttpStatus } from '@nestjs/common'

import {
  FIND_ALL_COMMON_DOCUMENTATION,
  FIND_ONE_COMMON_DOCUMENTATION,
  REMOVE_COMMON_DOCUMENTATION,
  UPDATE_COMMON_DOCUMENTATION,
} from 'src/api-documentation/common-documentation'
import { IDocumentation } from 'src/api-documentation/decorators'
import { ApiTag, BodyType, FILE_SCHEMA, NOT_EXISTING_ENTITY_RESPONSE } from 'src/api-documentation'
import { WithPagination } from 'src/response-interceptors/transform-to-response-dto/model/with-pagination.class'

import { User } from '../entities/user.entity'

const NOT_EXISTING_USER_RESPONSE = NOT_EXISTING_ENTITY_RESPONSE('user')

export const FIND_ONE_DOCUMENTATION = FIND_ONE_COMMON_DOCUMENTATION(
  User,
  'user',
  NOT_EXISTING_USER_RESPONSE
)

export const FIND_ALL_BY_FILTER_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Finding all members by filter.' },
  responses: [{ status: HttpStatus.OK, type: WithPagination(User) }],
  tags: [ApiTag.public],
}

export const FIND_ALL_DOCUMENTATION = FIND_ALL_COMMON_DOCUMENTATION(User, 'users')

export const UPDATE_DOCUMENTATION: IDocumentation = UPDATE_COMMON_DOCUMENTATION(
  'user',
  User,
  NOT_EXISTING_USER_RESPONSE
)

export const REMOVE_DOCUMENTATION: IDocumentation = REMOVE_COMMON_DOCUMENTATION(
  'user',
  NOT_EXISTING_USER_RESPONSE
)

export const SET_AVATAR_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Uploading user avatar image.' },
  consumes: BodyType.FORM,
  body: { description: 'Image in jpg format.', schema: FILE_SCHEMA },
  responses: [{ status: HttpStatus.OK, type: User }, NOT_EXISTING_USER_RESPONSE],
}
