import { ApiProperty, PickType } from '@nestjs/swagger'

import { Category } from '../entities/category.entity'

export class CreateCategoryDto extends PickType(Category, ['name', 'description'] as const) {
  authorId: number

  imageUrl: string

  @ApiProperty({ type: 'filename.jpg' })
  categoryImage: Express.Multer.File
}
