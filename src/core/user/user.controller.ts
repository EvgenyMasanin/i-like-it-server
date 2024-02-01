import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CRUDController } from 'src/common/interfaces'
import { GetCurrentUserId, Public } from 'src/auth/decorators'
import { Documentation } from 'src/api-documentation/decorators'
import { QueryPaginationDto } from 'src/common/dto/query-pagination.dto'
import { FileSaver } from 'src/file/decorators/file-saver.decorator'

import {
  FIND_ALL_BY_FILTER_DOCUMENTATION,
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

  @Get('/filter')
  @Documentation(FIND_ALL_BY_FILTER_DOCUMENTATION)
  findAllByFilter(@Query() filterDto: QueryUserDto) {
    return this.userService.findAllByFilter(filterDto)
  }

  @Get()
  @Public()
  @Documentation(FIND_ALL_DOCUMENTATION)
  findAll(@Query() queryPaginationDto: QueryPaginationDto) {
    return this.userService.findAll(queryPaginationDto)
  }

  @Post('set-avatar')
  @FileSaver('avatars', 'avatar')
  @Documentation(SET_AVATAR_DOCUMENTATION)
  async setAvatar(@GetCurrentUserId() userId: number, @UploadedFile() avatar: Express.Multer.File) {
    const avatarURL = avatar.filename

    return await this.userService.setAvatar(userId, avatarURL)
  }

  @Get(':id')
  @Public()
  @Documentation(FIND_ONE_DOCUMENTATION)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  @Documentation(UPDATE_DOCUMENTATION)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Documentation(REMOVE_DOCUMENTATION)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
