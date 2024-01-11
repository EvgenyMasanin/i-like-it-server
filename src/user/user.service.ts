import { HashService } from 'src/hash/hash.service'
import { Role } from 'src/role/entities/role.entity'
import { RoleService } from 'src/role/role.service'
import { DeepPartial, Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
    private readonly hashService: HashService
  ) {}

  async create({ rolesId, ...dto }: CreateUserDto) {
    const newUser = this.userRepository.create(dto)

    newUser.password = await this.hashService.hashData(dto.password)

    newUser.roles = await this.roleService.findMany(rolesId)

    return await this.userRepository.save(newUser)
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email })
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id })
  }

  async update(userId: number, partialUser: DeepPartial<User>) {
    if (Array.isArray(partialUser.roles)) {

      const roles = await this.roleService.findMany(
        partialUser.roles.map(({ id }: Role) => id)
      )

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
}
