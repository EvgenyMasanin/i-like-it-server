import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'

import { Public } from 'src/auth/decorators'

import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@Controller('roles')
@ApiTags('Roles')
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

  //TODO: delete this endpoint
  @Public()
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
