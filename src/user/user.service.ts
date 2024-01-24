import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { HashService } from 'src/hash/hash.service'
import { RoleService } from 'src/role/role.service'
import { FileService } from 'src/file/file.service'
import { Role } from 'src/role/entities/role.entity'
import { ExceptionService } from 'src/exception/exception.service'
import { IThrowException } from 'src/common/interfaces/ITrowException.interface'

import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService implements IThrowException {
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

  async findAll() {
    return await this.userRepository.find()
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

  async update(userId: number, partialUser: DeepPartial<User>) {
    await this.throwExceptionIfNotExist(userId)

    if (Array.isArray(partialUser.roles)) {
      const roles = await this.roleService.findMany(partialUser.roles.map(({ id }: Role) => id))

      return await this.userRepository.save({
        ...partialUser,
        id: userId,
        roles,
      })
    }

    return await this.userRepository.update(userId, partialUser)
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
