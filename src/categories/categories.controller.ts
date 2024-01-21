import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'

import { Documentation, FileSaver, GetCurrentUserId, Public } from 'src/common/decorators'
import { NonExistentUser } from 'src/common/errors/user/non-existent-user'

import { FilterDto } from './dto/filter.dto'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import {
  createDoc,
  findAllByAuthorDoc,
  findAllDoc,
  findOneDoc,
  removeDoc,
  updateDoc,
} from './documentation'

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @FileSaver('categoryImage', 'category-images')
  @Documentation(createDoc)
  create(
    @GetCurrentUserId() userId: number,
    @Body()
    createCategoryDto: CreateCategoryDto,
    @UploadedFile() categoryImage: Express.Multer.File
  ) {
    createCategoryDto.imageUrl = categoryImage.filename
    createCategoryDto.authorId = userId
    return this.categoriesService.create(createCategoryDto)
  }

  @Get('filter')
  @Documentation(findAllByAuthorDoc)
  findAllByAuthor(@Query() { userId }: FilterDto) {
    return this.categoriesService.findAllByAuthor(+userId)
  }

  @Get()
  @Documentation(findAllDoc)
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  @Documentation(findOneDoc)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id)
  }

  @Patch(':id')
  @Documentation(updateDoc)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto)
  }

  @Delete(':id')
  @Documentation(removeDoc)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id)
  }
}
