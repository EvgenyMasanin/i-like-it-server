import { HttpStatus } from '@nestjs/common'

import { IDocumentation } from 'src/common/decorators'
import { BodyType, FILE_SCHEMA, NOT_EXISTING_ENTITY_RESPONSE } from 'src/apiDocumentation'
import { UPDATE_COMMON_DOCUMENTATION } from 'src/apiDocumentation/common-documentation/update.documentation'
import { REMOVE_COMMON_DOCUMENTATION } from 'src/apiDocumentation/common-documentation/remove.documentation'
import { FIND_ONE_COMMON_DOCUMENTATION } from 'src/apiDocumentation/common-documentation/find-one.documentation'
import { FIND_ALL_COMMON_DOCUMENTATION } from 'src/apiDocumentation/common-documentation/find-all.documentation'

import { User } from '../entities/user.entity'

const NOT_EXISTING_USER_RESPONSE = NOT_EXISTING_ENTITY_RESPONSE('user')

export const FIND_ONE_DOCUMENTATION = FIND_ONE_COMMON_DOCUMENTATION(User, 'user', [
  NOT_EXISTING_USER_RESPONSE,
])

export const FIND_ALL_DOCUMENTATION = FIND_ALL_COMMON_DOCUMENTATION(User, 'users')

export const UPDATE_DOCUMENTATION: IDocumentation = UPDATE_COMMON_DOCUMENTATION(User, 'user', [
  NOT_EXISTING_USER_RESPONSE,
])

export const REMOVE_DOCUMENTATION: IDocumentation = REMOVE_COMMON_DOCUMENTATION('user', [
  NOT_EXISTING_USER_RESPONSE,
])

export const SET_AVATAR_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Uploading user avatar image.' },
  consumes: BodyType.form,
  body: { description: 'Image in jpg format.', schema: FILE_SCHEMA },
  responses: [{ status: HttpStatus.OK, type: User }, NOT_EXISTING_USER_RESPONSE],
}
