import { applyDecorators, Injectable, UseInterceptors } from '@nestjs/common'

import { extractAuthorData } from 'src/response-interceptors/transform-to-response-dto/mappers'
import { TransformToResponseDtoInterceptor } from 'src/response-interceptors/transform-to-response-dto'

import { CategoryDto } from '../dto/category.dto'
import { Category } from '../entities/category.entity'

function categoryDtoMapper(category: Category): CategoryDto {
  return extractAuthorData(category)
}

@Injectable()
class TransformToCategoryDtoInterceptor extends TransformToResponseDtoInterceptor<
  Category,
  CategoryDto
> {
  constructor() {
    super(categoryDtoMapper)
  }
}

export const TransformToMemberDto = () =>
  applyDecorators(UseInterceptors(TransformToCategoryDtoInterceptor))
