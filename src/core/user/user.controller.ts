import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  UploadedFile,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CRUDController } from 'src/common/interfaces'
import { GetCurrentUserId, Public } from 'src/auth/decorators'
import { ApiDocumentation } from 'src/api-documentation/decorators'
import { FileSaver } from 'src/file/decorators/file-saver.decorator'

import {
  FIND_ALL_DOCUMENTATION,
  FIND_ONE_DOCUMENTATION,
  REMOVE_DOCUMENTATION,
  SET_AVATAR_DOCUMENTATION,
  UPDATE_DOCUMENTATION,
} from './api-documentation'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { QueryUserDto } from './dto/query-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'

type MemberCRUDController = CRUDController<User, CreateUserDto, UpdateUserDto, QueryUserDto>

@Controller('users')
@ApiTags('Users')
export class UserController implements MemberCRUDController {
  constructor(private readonly userService: UserService) {}

  create(userId: number, createEntityDto: CreateUserDto, ...rest: unknown[]): Promise<User> {
    console.log(
      '🚀 ~ create ~ userId: number, createEntityDto: CreateUserDto, ...rest: unknown[]:',
      userId,
      createEntityDto,
      rest
    )
    throw new Error('Method not implemented.')
  }

  @Get()
  @ApiDocumentation(FIND_ALL_DOCUMENTATION)
  findAll(@Query() filterDto: QueryUserDto) {
    return this.userService.findAll(filterDto)
  }

  @Patch('set-avatar')
  @FileSaver('avatars', 'avatar')
  @ApiDocumentation(SET_AVATAR_DOCUMENTATION)
  async setAvatar(@GetCurrentUserId() userId: number, @UploadedFile() avatar: Express.Multer.File) {
    const avatarURL = avatar.filename

    return await this.userService.setAvatar(userId, avatarURL)
  }

  @Get(':id')
  @Public()
  @ApiDocumentation(FIND_ONE_DOCUMENTATION)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  @ApiDocumentation(UPDATE_DOCUMENTATION)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDocumentation(REMOVE_DOCUMENTATION)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
