import { extname } from 'path'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { diskStorage } from 'multer'
import { ConfigService } from '@nestjs/config'
import { FileInterceptor } from '@nestjs/platform-express'

import { FileSaver, GetCurrentUserId } from 'src/common/decorators'

import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Patch('set-avatar')
  @FileSaver('avatar', 'avatars')
  async setAvatar(@GetCurrentUserId() userId: number, @UploadedFile() avatar: Express.Multer.File) {
    const avatarUrl = avatar.filename
    console.log('🚀 ~ avatarUrl:', avatarUrl)

    return await this.userService.setAvatar(userId, avatarUrl)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
