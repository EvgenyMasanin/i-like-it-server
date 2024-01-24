import { ApiTags } from '@nestjs/swagger'
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
  UploadedFile,
} from '@nestjs/common'

import { Documentation, FileSaver, GetCurrentUserId, Public } from 'src/common/decorators'

import {
  FIND_ALL_DOCUMENTATION,
  FIND_ONE_DOCUMENTATION,
  REMOVE_DOCUMENTATION,
  SET_AVATAR_DOCUMENTATION,
  UPDATE_DOCUMENTATION,
} from './apiDocumentation'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Public()
  @Documentation(FIND_ALL_DOCUMENTATION)
  findAll() {
    return this.userService.findAll()
  }

  @Post('set-avatar')
  @FileSaver('avatar', 'avatars')
  @Documentation(SET_AVATAR_DOCUMENTATION)
  async setAvatar(@GetCurrentUserId() userId: number, @UploadedFile() avatar: Express.Multer.File) {
    const avatarUrl = avatar.filename

    return await this.userService.setAvatar(userId, avatarUrl)
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
