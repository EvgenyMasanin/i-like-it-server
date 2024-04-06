import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CRUDController } from 'src/common/interfaces'
import { GetCurrentUserId, Public } from 'src/auth/decorators'
import { Documentation } from 'src/api-documentation/decorators'
import { FileSaver } from 'src/file/decorators/file-saver.decorator'
import { WithPagination } from 'src/response-interceptors/transform-to-response-dto/model'
import { ExcludeTransformToResponseDto } from 'src/response-interceptors/transform-to-response-dto'

import {
  CREATE_DOCUMENTATION,
  FIND_ALL_DOCUMENTATION,
  FIND_ONE_DOCUMENTATION,
  REMOVE_DOCUMENTATION,
  UPDATE_DOCUMENTATION,
} from './api-documentation'
import { TransformToMemberDto } from './interceptors'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'
import { QueryCategoryDto } from './dto/query-category.dto'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

type CategoriesCRUDController = CRUDController<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  QueryCategoryDto
>

@ApiTags('categories')
@Controller('Categories')
@TransformToMemberDto()
export class CategoriesController implements CategoriesCRUDController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @FileSaver('category-images', 'categoryImage')
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

  @Get()
  @Public()
  @Documentation(FIND_ALL_DOCUMENTATION)
  findAll(@Query() filterDto: QueryCategoryDto): Promise<WithPagination<Category>> {
    return this.categoriesService.findAll(filterDto)
  }

  @Get(':id')
  @Public()
  @Documentation(FIND_ONE_DOCUMENTATION)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id)
  }

  @Patch(':id')
  @Documentation(UPDATE_DOCUMENTATION)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @GetCurrentUserId() userId: number
  ) {
    return this.categoriesService.update(+id, updateCategoryDto, userId)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ExcludeTransformToResponseDto()
  @Documentation(REMOVE_DOCUMENTATION)
  remove(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    return this.categoriesService.remove(+id, userId)
  }
}
