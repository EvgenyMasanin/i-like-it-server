import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException, Injectable } from '@nestjs/common'

import { UserService } from 'src/user/user.service'
import { NonExistentUser } from 'src/common/errors/user/non-existent-user'

import { Category } from './entities/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    private readonly userService: UserService
  ) {}

  async create({ authorId, ...createCategoryDto }: CreateCategoryDto) {
    const author = await this.userService.findOne(authorId)

    if (!author) {
      throw new NonExistentUser()
    }

    const category = this.categoryRepository.create(createCategoryDto)

    category.author = author

    return await this.categoryRepository.save(category)
  }

  async findAllByAuthor(id: number) {
    const author = await this.userService.findOne(id)
    if (!author) {
      throw new NonExistentUser()
    }

    return this.categoryRepository.find({ where: { author } })
  }

  async findAll() {
    return await this.categoryRepository.find()
  }

  findOne(id: number) {
    return this.categoryRepository.findOneBy({ id })
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.save({ id, ...updateCategoryDto })
  }

  async remove(id: number) {
    const category = await this.findOne(id)
    if (!category) {
      throw new NonExistentUser()
    }

    return this.categoryRepository.delete(id)
  }
}
