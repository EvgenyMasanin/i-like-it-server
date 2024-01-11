import { BasicRole } from 'src/common/decorators/role.decorator'
import { In, Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Role } from './entities/role.entity'

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepository.save(createRoleDto)
  }

  async findMany(rolesIds: number[]) {
    return await this.roleRepository.findBy({ id: In(rolesIds) })
  }

  async findAll() {
    return await this.roleRepository.find()
  }

  async findOne(id: number) {
    return await this.roleRepository.findOneBy({ id })
  }

  async findOneByName(name: string) {
    return await this.roleRepository.findOneBy({ name })
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.roleRepository.update(id, updateRoleDto)
  }

  async remove(id: number) {
    return await this.roleRepository.delete(id)
  }

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
}
