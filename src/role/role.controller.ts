import { Public } from 'src/common/decorators'

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'

import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RoleService } from './role.service'

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  @Public()
  @Get()
  findAll() {
    return this.roleService.findAll()
  }

  @Get('generate-basic-roles')
  generateBasicRoles() {
    return this.roleService.generateBasicRoles()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id)
  }
}
