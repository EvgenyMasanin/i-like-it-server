import { FILE_SCHEMA } from 'src/api-documentation'
import {
  CREATE_COMMON_DOCUMENTATION,
  FIND_ALL_COMMON_DOCUMENTATION,
  FIND_ONE_COMMON_DOCUMENTATION,
  REMOVE_COMMON_DOCUMENTATION,
  UPDATE_COMMON_DOCUMENTATION,
} from 'src/api-documentation/common-documentation'
import { IApiDocumentation } from 'src/api-documentation/decorators'

import { CategoryDto } from '../dto/category.dto'

export const CREATE_DOCUMENTATION: IApiDocumentation = {
  ...CREATE_COMMON_DOCUMENTATION({
    entityName: 'category',
    entity: CategoryDto,
  }),
  body: { description: 'Image in jpg format.', schema: FILE_SCHEMA },
}

export const FIND_ALL_DOCUMENTATION: IApiDocumentation = FIND_ALL_COMMON_DOCUMENTATION({
  entity: CategoryDto,
  entityName: 'category',
})

export const FIND_ONE_DOCUMENTATION: IApiDocumentation = FIND_ONE_COMMON_DOCUMENTATION({
  entity: CategoryDto,
  entityName: 'category',
})

export const UPDATE_DOCUMENTATION: IApiDocumentation = UPDATE_COMMON_DOCUMENTATION({
  entityName: 'category',
  entity: CategoryDto,
})

export const REMOVE_DOCUMENTATION: IApiDocumentation = REMOVE_COMMON_DOCUMENTATION({
  entityName: 'category',
})
