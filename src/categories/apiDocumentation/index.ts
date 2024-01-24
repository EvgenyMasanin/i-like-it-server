import { HttpStatus } from '@nestjs/common'

import { IDocumentation } from 'src/common/decorators'
import { BodyType, FILE_SCHEMA, NOT_EXISTING_ENTITY_RESPONSE } from 'src/apiDocumentation'
import { FORBIDDEN_RESPONSE } from 'src/apiDocumentation/responses/forbidden'
import { NonExistentEntityException } from 'src/common/exceptions/non-existent.exception'
import { UPDATE_COMMON_DOCUMENTATION } from 'src/apiDocumentation/common-documentation/update.documentation'
import { REMOVE_COMMON_DOCUMENTATION } from 'src/apiDocumentation/common-documentation/remove.documentation'
import { FIND_ALL_COMMON_DOCUMENTATION } from 'src/apiDocumentation/common-documentation/find-all.documentation'
import { FIND_ONE_COMMON_DOCUMENTATION } from 'src/apiDocumentation/common-documentation/find-one.documentation'

import { Category } from '../entities/category.entity'

const NOT_EXISTING_CATEGORY_RESPONSE = NOT_EXISTING_ENTITY_RESPONSE('category')

export const CREATE_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Creating new category.' },
  consumes: BodyType.form,
  body: { description: 'Image in jpg format.', schema: FILE_SCHEMA },
  responses: [{ status: HttpStatus.OK, type: Category }, NOT_EXISTING_CATEGORY_RESPONSE],
}

export const FIND_ALL_BY_AUTHOR_DOCUMENTATION: IDocumentation = FIND_ALL_COMMON_DOCUMENTATION(
  Category,
  'user categories',
  [NOT_EXISTING_ENTITY_RESPONSE('user')]
)

export const FIND_ALL_DOCUMENTATION: IDocumentation = FIND_ALL_COMMON_DOCUMENTATION(
  Category,
  'categories'
)

export const FIND_ONE_DOCUMENTATION: IDocumentation = FIND_ONE_COMMON_DOCUMENTATION(
  Category,
  'category',
  [NOT_EXISTING_CATEGORY_RESPONSE]
)

export const UPDATE_DOCUMENTATION: IDocumentation = UPDATE_COMMON_DOCUMENTATION(
  Category,
  'category',
  [NOT_EXISTING_CATEGORY_RESPONSE, FORBIDDEN_RESPONSE]
)

export const REMOVE_DOCUMENTATION: IDocumentation = REMOVE_COMMON_DOCUMENTATION('category', [
  NOT_EXISTING_CATEGORY_RESPONSE,
  FORBIDDEN_RESPONSE,
])
