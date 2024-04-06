import { ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { CRUDService } from 'src/common/interfaces'
import { ExceptionService } from 'src/exception/exception.service'
import { Pagination } from 'src/response-interceptors/transform-to-response-dto/model'

import { UserService } from '../user/user.service'
import { Member } from './entities/member.entity'
import { QueryMemberDto } from './dto/query-member.dto'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { MemberGallery } from './entities/member-gallery.entity'
import { CategoriesService } from '../categories/categories.service'
import { CreateMemberGalleryDto } from './dto/create-member-gallery.dto'
import { CharacteristicService } from '../characteristic/characteristic.service'

type MemberCRUDService = CRUDService<Member, CreateMemberDto, UpdateMemberDto, QueryMemberDto>

@Injectable()
export class MemberService implements MemberCRUDService {
  constructor(
    @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
    @InjectRepository(MemberGallery)
    private readonly memberGalleryRepository: Repository<MemberGallery>,
    private readonly characteristicService: CharacteristicService,
    private readonly categoriesService: CategoriesService,
    private readonly userService: UserService,
    private readonly exceptionService: ExceptionService
  ) {}
  async create(createMemberDto: CreateMemberDto) {
    const {
      authorId,
      characteristics: characteristicsDto,
      categoryId,
      name,
      description,
    } = createMemberDto

    const { avatarURL, username } = await this.userService.findOne(authorId)
    const { name: categoryName } = await this.categoriesService.findOne(categoryId)

    const newMember = this.memberRepository.create({
      category: { id: categoryId, name: categoryName },
      author: { id: authorId, avatarURL, username },
      name,
      description,
      usersLikesIds: [],
    })

    const member = await this.memberRepository.save(newMember)

    const characteristics = await this.characteristicService.createMany(member, characteristicsDto)

    member.characteristics = characteristics
    member.gallery = []

    return await this.memberRepository.save(member)
  }

  async uploadGallery(
    id: number,
    hasMain: boolean,
    { gallery: galleryDto }: CreateMemberGalleryDto
  ) {
    if (hasMain) {
      await this.updateAll({ isMain: false })
    }
    const member = await this.findOne(id)

    const gallery = await this.createGallery(galleryDto, member)

    member.gallery = member.gallery.concat(gallery)
    return member
  }

  // findAll(queryPaginationDto: QueryPaginationDto) {
  //   return this.findAllByFilter(queryPaginationDto)
  // }

  async findOne(id: number) {
    const member = await this.memberRepository.findOneBy({ id })

    this.throwExceptionIfNotExist(member)

    return member
  }

  async update(id: number, updateMemberDto: UpdateMemberDto, userId: number) {
    const member = await this.findOne(id)
    if (member.authorId !== userId) {
      throw new ForbiddenException('Only author of category member allow to edit it.')
    }

    await this.memberRepository.update(id, updateMemberDto)

    return this.findOne(id)
  }

  async remove(id: number, userId: number) {
    const member = await this.findOne(id)
    if (member.authorId !== userId) {
      throw new ForbiddenException('Only author of category member allow to delete it.')
    }
    return this.memberRepository.delete(id)
  }

  private updateAll(partialMember: QueryDeepPartialEntity<MemberGallery>) {
    return this.memberGalleryRepository.update({}, partialMember)
  }

  async findAll(queryParameters: QueryMemberDto) {
    const { authorId, categoryId, name, limit = 10, offset = 0 } = queryParameters

    const [data, total] = await this.memberRepository.findAndCount({
      where: {
        name: name && ILike(`%${name}%`),
        authorId,
        categoryId,
      },
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
    })

    const pagination: Pagination = {
      total,
      offset,
      limit,
    }

    return { data, pagination }
  }

  private createGallery(galleryDto: CreateMemberGalleryDto['gallery'], member: Member) {
    return Promise.all(
      galleryDto.map(({ imageUrl, isMain }) =>
        this.memberGalleryRepository.save(
          this.memberGalleryRepository.create({ member, imageUrl, isMain })
        )
      )
    )
  }

  async like(userId: number, memberId: number) {
    const user = await this.userService.findOne(userId)
    const member = await this.findOne(memberId)

    const isAlreadyLiked = member.usersLikesIds.some(({ id }) => id === userId)

    if (isAlreadyLiked) {
      return this.unlike(member, userId)
    }
    member.usersLikesIds = member.usersLikesIds.concat(user)
    await this.memberRepository.save(member)

    return this.findOne(memberId)
  }

  private async unlike(member: Member, userId: number) {
    member.usersLikesIds = member.usersLikesIds.filter(({ id }) => id !== userId)
    await this.memberRepository.save(member)

    return this.findOne(member.id)
  }

  throwExceptionIfNotExist(memberOrId: Member | number) {
    if (typeof memberOrId === 'number') {
      return (async () => await this.findOne(memberOrId))()
    } else {
      this.exceptionService.throwIfNotExist(memberOrId, 'member')
    }
  }
}
