import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Documentation, FileSaver, GetCurrentUserId, Public } from 'src/common/decorators'

import {
  CREATE_DOCUMENTATION,
  FIND_ALL_BY_AUTHOR_DOCUMENTATION,
  FIND_ALL_DOCUMENTATION,
  FIND_ONE_DOCUMENTATION,
  REMOVE_DOCUMENTATION,
  UPDATE_DOCUMENTATION,
} from './apiDocumentation'
import { FilterDto } from './dto/filter.dto'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@ApiTags('categories')
@Controller('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @FileSaver('categoryImage', 'category-images')
  @Documentation(CREATE_DOCUMENTATION)
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
  @Public()
  @Documentation(FIND_ALL_BY_AUTHOR_DOCUMENTATION)
  findAllByAuthor(@Query() { userId }: FilterDto) {
    return this.categoriesService.findAllByAuthor(+userId)
  }

  @Get()
  @Public()
  @Documentation(FIND_ALL_DOCUMENTATION)
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  @Public()
  @Documentation(FIND_ONE_DOCUMENTATION)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id)
  }

  @Patch(':id')
  @Documentation(UPDATE_DOCUMENTATION)
  update(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(+id, userId, updateCategoryDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Documentation(REMOVE_DOCUMENTATION)
  remove(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    return this.categoriesService.remove(+id, userId)
  }
}
