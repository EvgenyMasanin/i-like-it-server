import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException, Injectable } from '@nestjs/common'

import { HashService } from 'src/hash/hash.service'
import { RoleService } from 'src/role/role.service'
import { FileService } from 'src/file/file.service'
import { Role } from 'src/role/entities/role.entity'

import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
    private readonly hashService: HashService,
    private readonly fileService: FileService
  ) {}

  async create({ rolesId, ...dto }: CreateUserDto) {
    const newUser = this.userRepository.create(dto)

    newUser.password = await this.hashService.hashData(dto.password)

    newUser.roles = await this.roleService.findMany(rolesId)

    return await this.userRepository.save(newUser)
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email })
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id })
  }

  async getPassword(id: number) {
    return (await this.userRepository.findOne({ where: { id }, select: ['id', 'password'] }))
      .password
  }

  async getRefreshToken(id: number) {
    return (await this.userRepository.findOne({ where: { id }, select: ['id', 'refreshToken'] }))
      .refreshToken
  }

  async update(userId: number, partialUser: DeepPartial<User>) {
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

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  async setAvatar(id: number, avatarURL: string) {
    const user = await this.findOne(id)

    if (!user) {
      throw new BadRequestException('There is no user with provided id!')
    }

    if (user.avatarURL) {
      await this.fileService.deleteFile(user.avatarURL)
    }

    user.avatarURL = avatarURL

    this.userRepository.save(user)
  }
}
