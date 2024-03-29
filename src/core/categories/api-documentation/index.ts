import { HttpStatus } from '@nestjs/common'

import {
  ApiTag,
  BodyType,
  FILE_SCHEMA,
  FORBIDDEN_RESPONSE,
  NOT_EXISTING_ENTITY_RESPONSE,
} from 'src/api-documentation'
import { User } from 'src/core/user/entities/user.entity'
import {
  FIND_ALL_COMMON_DOCUMENTATION,
  FIND_ONE_COMMON_DOCUMENTATION,
  REMOVE_COMMON_DOCUMENTATION,
  UPDATE_COMMON_DOCUMENTATION,
} from 'src/api-documentation/common-documentation'
import { IDocumentation } from 'src/api-documentation/decorators'
import { WithPagination } from 'src/response-interceptors/transform-to-response-dto/model/with-pagination.class'

import { Category } from '../entities/category.entity'

const NOT_EXISTING_CATEGORY_RESPONSE = NOT_EXISTING_ENTITY_RESPONSE('category')

export const CREATE_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Creating new category.' },
  consumes: BodyType.FORM,
  body: { description: 'Image in jpg format.', schema: FILE_SCHEMA },
  responses: [{ status: HttpStatus.OK, type: Category }, NOT_EXISTING_CATEGORY_RESPONSE],
}

// export const FIND_ALL_BY_FILTER_DOCUMENTATION: IDocumentation = FIND_ALL_COMMON_DOCUMENTATION(
//   Category,
//   'user categories'
// )

export const FIND_ALL_BY_FILTER_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Finding all categories by filter with pagination.' },
  responses: [{ status: HttpStatus.OK, type: WithPagination(Category) }],
  tags: [ApiTag.public],
}

export const FIND_ALL_DOCUMENTATION: IDocumentation = FIND_ALL_COMMON_DOCUMENTATION(
  WithPagination(Category),
  'categories'
)

export const FIND_ONE_DOCUMENTATION: IDocumentation = FIND_ONE_COMMON_DOCUMENTATION(
  Category,
  'category',
  NOT_EXISTING_CATEGORY_RESPONSE
)

export const UPDATE_DOCUMENTATION: IDocumentation = UPDATE_COMMON_DOCUMENTATION(
  'category',
  NOT_EXISTING_CATEGORY_RESPONSE,
  FORBIDDEN_RESPONSE
)

export const REMOVE_DOCUMENTATION: IDocumentation = REMOVE_COMMON_DOCUMENTATION(
  'category',
  NOT_EXISTING_CATEGORY_RESPONSE,
  FORBIDDEN_RESPONSE
)
