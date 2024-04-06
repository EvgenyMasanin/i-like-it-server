import { HttpStatus } from '@nestjs/common'

import {
  FIND_ALL_COMMON_DOCUMENTATION,
  FIND_ONE_COMMON_DOCUMENTATION,
  REMOVE_COMMON_DOCUMENTATION,
  UPDATE_COMMON_DOCUMENTATION,
} from 'src/api-documentation/common-documentation'
import { IApiDocumentation } from 'src/api-documentation/decorators'
import { BodyType, FILE_SCHEMA, UNAUTHORIZED_RESPONSE } from 'src/api-documentation'

import { User } from '../entities/user.entity'

export const FIND_ONE_DOCUMENTATION = FIND_ONE_COMMON_DOCUMENTATION({
  entity: User,
  entityName: 'user',
})

export const FIND_ALL_DOCUMENTATION: IApiDocumentation = FIND_ALL_COMMON_DOCUMENTATION({
  entity: User,
  entityName: 'user',
})

export const UPDATE_DOCUMENTATION: IApiDocumentation = UPDATE_COMMON_DOCUMENTATION({
  entity: User,
  entityName: 'user',
})

export const REMOVE_DOCUMENTATION: IApiDocumentation = REMOVE_COMMON_DOCUMENTATION({
  entityName: 'user',
})

export const SET_AVATAR_DOCUMENTATION: IApiDocumentation = {
  operation: { summary: 'Uploading user avatar image.' },
  consumes: BodyType.FORM,
  body: { description: 'Image in jpg format.', schema: FILE_SCHEMA },
  responses: [{ status: HttpStatus.OK, type: User }, UNAUTHORIZED_RESPONSE],
}
