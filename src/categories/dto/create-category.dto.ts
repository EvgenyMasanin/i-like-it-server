import { ApiProperty, PickType } from '@nestjs/swagger'

import { IsString } from 'class-validator'

import { Category } from '../entities/category.entity'

export class CreateCategoryDto extends PickType(Category, ['name', 'description'] as const) {
  // @ApiProperty({ example: 'Fruit' })
  // @IsString()
  // name: string

  // @ApiProperty({ example: 'Category about fruits.' })
  // @IsString()
  // description: string

  authorId: number

  imageUrl: string

  @ApiProperty({type : 'filename.jpg'})
  categoryImage: Express.Multer.File
}
