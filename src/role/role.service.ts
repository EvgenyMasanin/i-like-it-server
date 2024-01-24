import { In, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { ExceptionService } from 'src/exception/exception.service'
import { BasicRole } from 'src/common/decorators/auth/role.decorator'
import { IThrowException } from 'src/common/interfaces/ITrowException.interface'

import { Role } from './entities/role.entity'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@Injectable()
export class RoleService implements IThrowException {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly exceptionService: ExceptionService
  ) {}

  async create({ description, name }: CreateRoleDto) {
    this.findOneByName(name)

    return await this.roleRepository.save({ description, name })
  }

  async findMany(rolesIds: number[]) {
    return await this.roleRepository.findBy({ id: In(rolesIds) })
  }

  async findAll() {
    return await this.roleRepository.find()
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOneBy({ id })

    this.throwExceptionIfNotExist(role)

    return role
  }

  async findOneByName(name: string) {
    const role = await this.roleRepository.findOneBy({ name })

    this.throwExceptionIfNotExist(role)

    return role
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.throwExceptionIfNotExist(id)

    return await this.roleRepository.update(id, updateRoleDto)
  }

  async remove(id: number) {
    await this.throwExceptionIfNotExist(id)

    return await this.roleRepository.delete(id)
  }
  //FIXME: for dev only
  async generateBasicRoles() {
    if (await this.roleRepository.findOneBy({ name: BasicRole.admin })) {
      return 'Basic roles already generated'
    }

    const admin: CreateRoleDto = { name: BasicRole.admin, description: 'Role with full access' }
    const guest: CreateRoleDto = { name: BasicRole.guest, description: 'Basic role' }
    const user: CreateRoleDto = { name: BasicRole.user, description: 'Authorized user role' }

    await this.roleRepository.save(admin)
    await this.roleRepository.save(guest)
    await this.roleRepository.save(user)

    return 'Basic roles generated'
  }

  throwExceptionIfNotExist(roleOrId: Role | number) {
    if (typeof roleOrId === 'number') {
      return (async () => await this.findOne(roleOrId))()
    } else {
      this.exceptionService.throwIfNotExist(roleOrId, 'role')
    }
  }
}
