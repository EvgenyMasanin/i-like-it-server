import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ForbiddenException, Injectable } from '@nestjs/common'

import { UserService } from 'src/user/user.service'
import { ExceptionService } from 'src/exception/exception.service'
import { IThrowException } from 'src/common/interfaces/ITrowException.interface'

import { Category } from './entities/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService implements IThrowException {
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

  async findAllByAuthor(id: number) {
    const author = await this.userService.findOne(id)

    return this.categoryRepository.find({ where: { author } })
  }

  async findAll() {
    return await this.categoryRepository.find()
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id })

    this.throwExceptionIfNotExist(category)

    return category
  }

  async update(id: number, userId: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.throwExceptionIfNotExist(id)

    if (category.author.id !== userId) {
      throw new ForbiddenException('Only author of category allow to edit it.')
    }

    return this.categoryRepository.save({ id, ...updateCategoryDto })
  }

  async remove(id: number, userId: number) {
    const category = await this.throwExceptionIfNotExist(id)

    if (category.author.id !== userId) {
      throw new ForbiddenException('Only author of category allow to delete it.')
    }

    return this.categoryRepository.delete(id)
  }

  throwExceptionIfNotExist(categoryOrId: Category | number) {
    if (typeof categoryOrId === 'number') {
      return (async () => await this.findOne(categoryOrId))()
    } else {
      this.exceptionService.throwIfNotExist(categoryOrId, 'category')
    }
  }
}
