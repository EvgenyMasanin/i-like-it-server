import { FindOperator, ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ForbiddenException, Injectable } from '@nestjs/common'

import { CRUDService } from 'src/common/interfaces'
import { UserService } from 'src/core/user/user.service'
import { ExceptionService } from 'src/exception/exception.service'
import { QueryPaginationDto } from 'src/common/dto/query-pagination.dto'
import { Pagination } from 'src/response-interceptors/transform-to-response-dto/model'

import { Category } from './entities/category.entity'
import { QueryCategoryDto } from './dto/query-category.dto'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

type CategoriesCRUDService = CRUDService<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  QueryCategoryDto
>

@Injectable()
export class CategoriesService implements CategoriesCRUDService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    private readonly userService: UserService,
    private readonly exceptionService: ExceptionService
  ) {}

  async create({ authorId, ...createCategoryDto }: CreateCategoryDto) {
    const author = await this.userService.findOne(authorId)

    const category = this.categoryRepository.create(createCategoryDto)

    category.author = author

    return await this.categoryRepository.save(category)
  }

  async findAll(queryPaginationDto: QueryPaginationDto) {
    const res = await this.findAllByFilter(queryPaginationDto)
    return res
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id })

    this.throwExceptionIfNotExist(category)

    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, userId: number) {
    const category = await this.findOne(id)

    if (category.author.id !== userId) {
      throw new ForbiddenException('Only author of category allow to edit it.')
    }

    await this.categoryRepository.update(id, updateCategoryDto)

    return this.findOne(id)
  }

  async remove(id: number, userId: number) {
    const category = await this.throwExceptionIfNotExist(id)

    if (category.author.id !== userId) {
      throw new ForbiddenException('Only author of category allow to delete it.')
    }

    return this.categoryRepository.delete(id)
  }

  async findAllByFilter(queryParameters: QueryCategoryDto) {
    const { authorId, categoryId, name, limit = 10, offset = 0 } = queryParameters

    const findParameters: { name?: FindOperator<string>; authorId?: number; categoryId?: number } =
      {}
    if (name) findParameters.name = ILike(`%${name}%`)
    if (authorId) findParameters.authorId = authorId
    if (categoryId) findParameters.categoryId = categoryId

    const [data, total] = await this.categoryRepository.findAndCount({
      where: findParameters,
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
    })

    const pagination: Pagination = {
      total,
      offset,
      limit,
    }

    return { data, pagination }
  }

  throwExceptionIfNotExist(categoryOrId: Category | number) {
    if (typeof categoryOrId === 'number') {
      return (async () => await this.findOne(categoryOrId))()
    } else {
      this.exceptionService.throwIfNotExist(categoryOrId, 'category')
    }
  }
}
