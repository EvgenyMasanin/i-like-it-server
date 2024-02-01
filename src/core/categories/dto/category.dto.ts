import { OmitType } from '@nestjs/swagger'

import { AuthorInfo } from 'src/response-interceptors/transform-to-response-dto/model'

import { Category } from '../entities/category.entity'

export class CategoryDto extends AuthorInfo(OmitType(Category, ['author'] as const)) {}
