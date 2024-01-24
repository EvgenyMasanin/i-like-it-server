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
  UploadedFiles,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Documentation, FileSaver, GetCurrentUserId, Public } from 'src/common/decorators'

import {
  CREATE_MEMBER_DOCUMENTATION,
  FIND_ALL_DOCUMENTATION,
  FIND_ONE_DOCUMENTATION,
  REMOVE_DOCUMENTATION,
  UPDATE_DOCUMENTATION,
  UPLOAD_GALLERY_DOCUMENTATION,
} from './apiDocumentation'
import { MemberService } from './member.service'
import { memberMapper } from './mappers/member.mapper'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'

@Controller('members')
@ApiTags('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Documentation(CREATE_MEMBER_DOCUMENTATION)
  async create(@GetCurrentUserId() userId: number, @Body() createMemberDto: CreateMemberDto) {
    createMemberDto.authorId = userId

    return memberMapper(await this.memberService.create(createMemberDto))
  }

  @Post('/gallery/:memberId')
  @HttpCode(HttpStatus.CREATED)
  @FileSaver('member-gallery')
  @Documentation(UPLOAD_GALLERY_DOCUMENTATION)
  async uploadGallery(
    @UploadedFiles() memberGallery: Express.Multer.File[],
    @Param('memberId') id: string,
    @Body() { mainImageFieldName }: { mainImageFieldName: string }
  ) {
    const gallery = memberGallery.map((image) => ({
      imageUrl: image.filename,
      isMain: mainImageFieldName === image.fieldname,
    }))

    const newGallery = await this.memberService.uploadGallery(+id, !!mainImageFieldName, {
      gallery,
    })

    return newGallery.map(({ member: { id }, ...gallery }) => {
      return { ...gallery, memberId: id }
    })
  }

  @Get()
  @Public()
  @Documentation(FIND_ALL_DOCUMENTATION)
  findAll() {
    console.log('🚀 ~ findAll ~ findAll:')
    return this.memberService.findAll()
  }

  @Get(':id')
  @Public()
  @Documentation(FIND_ONE_DOCUMENTATION)
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id)
  }

  @Patch(':id')
  @Documentation(UPDATE_DOCUMENTATION)
  update(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() updateMemberDto: UpdateMemberDto
  ) {
    return this.memberService.update(+id, userId, updateMemberDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Documentation(REMOVE_DOCUMENTATION)
  remove(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    return this.memberService.remove(+id, userId)
  }
}
