import { FindOperator, ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { CRUDService } from 'src/common/interfaces'
import { FileService } from 'src/file/file.service'
import { HashService } from 'src/hash/hash.service'
import { RoleService } from 'src/core/role/role.service'
import { Role } from 'src/core/role/entities/role.entity'
import { ExceptionService } from 'src/exception/exception.service'
import { QueryPaginationDto } from 'src/common/dto/query-pagination.dto'
import { Pagination } from 'src/response-interceptors/transform-to-response-dto/model'

import { User } from './entities/user.entity'
import { QueryUserDto } from './dto/query-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

type CategoriesCRUDService = CRUDService<User, CreateUserDto, UpdateUserDto, QueryUserDto>

@Injectable()
export class UserService implements CategoriesCRUDService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
    private readonly hashService: HashService,
    private readonly fileService: FileService,
    private readonly exceptionService: ExceptionService
  ) {}

  async create({ rolesId, email, username, password }: CreateUserDto) {
    await this.throwExceptionIfUserExist(email, username)

    const newUser = this.userRepository.create({ email, username })

    newUser.password = await this.hashService.hashData(password)

    newUser.roles = await this.roleService.findMany(rolesId)

    return await this.userRepository.save(newUser)
  }

  async findAll(queryPaginationDto: QueryPaginationDto) {
    return this.findAllByFilter(queryPaginationDto)
  }

  async findAllByFilter(queryPaginationDto: QueryUserDto) {
    const { username, limit = 10, offset = 0 } = queryPaginationDto

    const findParameters: { username?: FindOperator<string>; roles?: FindOperator<Role> } = {}
    if (username) findParameters.username = ILike(`%${username}%`)

    const [data, total] = await this.userRepository.findAndCount({
      where: findParameters,
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

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id })

    this.throwExceptionIfNotExist(user)

    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email })

    return user
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username })

    return user
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    await this.throwExceptionIfNotExist(userId)

    if (Array.isArray(updateUserDto.rolesId)) {
      const roles = await this.roleService.findMany(updateUserDto.rolesId)

      await this.userRepository.update(userId, {
        ...updateUserDto,
        roles,
      })
      return this.findOne(userId)
    }

    await this.userRepository.update(userId, updateUserDto)
    return this.findOne(userId)
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.throwExceptionIfNotExist(userId)

    return this.userRepository.update(userId, { refreshToken })
  }

  async remove(id: number) {
    await this.throwExceptionIfNotExist(id)

    return this.userRepository.delete(id)
  }

  async throwExceptionIfUserExist(email: string, username: string) {
    if (await this.findOneByEmail(email))
      throw new UnauthorizedException('This email is already in use!')
    if (await this.findOneByUsername(username))
      throw new UnauthorizedException('This username is already in use!')
  }

  async setAvatar(id: number, avatarURL: string) {
    const user = await this.findOne(id)

    if (user.avatarURL) {
      await this.fileService.deleteFile(user.avatarURL)
    }

    user.avatarURL = avatarURL

    this.userRepository.save(user)
  }

  async getPassword(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, select: ['id', 'password'] })

    this.throwExceptionIfNotExist(user)

    return user.password
  }

  async getRefreshToken(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'refreshToken'],
    })

    this.throwExceptionIfNotExist(user)

    return user.refreshToken
  }

  throwExceptionIfNotExist(userOrId: User | number) {
    if (typeof userOrId === 'number') {
      return (async () => await this.findOne(userOrId))()
    } else {
      this.exceptionService.throwIfNotExist(userOrId, 'user')
    }
  }
}
