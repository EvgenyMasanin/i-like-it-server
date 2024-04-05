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
  UploadedFiles,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { GetCurrentUserId, Public } from 'src/auth/decorators'
import { Documentation } from 'src/api-documentation/decorators'
import { QueryPaginationDto } from 'src/common/dto/query-pagination.dto'
import { FileSaver } from 'src/file/decorators/file-saver.decorator'
import { CRUDController } from 'src/common/interfaces/CRUDController.interface'
import { ExcludeTransformToResponseDto } from 'src/response-interceptors/transform-to-response-dto'

import { Member } from './entities'
import {
  CREATE_MEMBER_DOCUMENTATION,
  FIND_ALL_BY_FILTER_DOCUMENTATION,
  FIND_ALL_DOCUMENTATION,
  FIND_ONE_DOCUMENTATION,
  LIKE_DOCUMENTATION,
  REMOVE_DOCUMENTATION,
  UPDATE_DOCUMENTATION,
  UPLOAD_GALLERY_DOCUMENTATION,
} from './api-documentation'
import { MemberService } from './member.service'
import { TransformToMemberDto } from './interceptors'
import { QueryMemberDto } from './dto/query-member.dto'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'

type MemberCRUDController = CRUDController<Member, CreateMemberDto, UpdateMemberDto, QueryMemberDto>

@Controller('members')
@ApiTags('members')
@TransformToMemberDto()
export class MemberController implements MemberCRUDController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Documentation(CREATE_MEMBER_DOCUMENTATION)
  async create(@GetCurrentUserId() userId: number, @Body() createMemberDto: CreateMemberDto) {
    createMemberDto.authorId = userId

    return this.memberService.create(createMemberDto)
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
    const gallery = memberGallery.map(({ filename, fieldname }) => ({
      imageUrl: filename,
      isMain: mainImageFieldName === fieldname,
    }))

    return await this.memberService.uploadGallery(+id, !!mainImageFieldName, {
      gallery,
    })
  }

  @Patch('like/:id')
  @Documentation(LIKE_DOCUMENTATION)
  like(@GetCurrentUserId() userId: number, @Param('id') memberId: string) {
    console.log()
    return this.memberService.like(userId, +memberId)
  }

  @Get('/filter')
  @Public()
  @Documentation(FIND_ALL_BY_FILTER_DOCUMENTATION)
  findAllByFilter(@Query() filterDto: QueryMemberDto) {
    return this.memberService.findAllByFilter(filterDto)
  }

  @Get()
  @Public()
  @Documentation(FIND_ALL_DOCUMENTATION)
  async findAll(@Query() queryPaginationDto: QueryPaginationDto) {
    return this.memberService.findAll(queryPaginationDto)
  }

  @Get(':id')
  @Public()
  @Documentation(FIND_ONE_DOCUMENTATION)
  async findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id)
  }

  @Patch(':id')
  // @ExcludeTransformToResponseDto()
  @Documentation(UPDATE_DOCUMENTATION)
  update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
    @GetCurrentUserId() userId: number
  ) {
    return this.memberService.update(+id, updateMemberDto, userId)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ExcludeTransformToResponseDto()
  @Documentation(REMOVE_DOCUMENTATION)
  remove(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    return this.memberService.remove(+id, userId)
  }
}
