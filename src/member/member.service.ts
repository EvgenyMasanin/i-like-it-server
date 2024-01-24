import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { UserService } from 'src/user/user.service'
import { ExceptionService } from 'src/exception/exception.service'
import { CategoriesService } from 'src/categories/categories.service'
import { CharacteristicService } from 'src/characteristic/characteristic.service'
import { IThrowException } from 'src/common/interfaces/ITrowException.interface'
import { Characteristic } from 'src/characteristic/entities/characteristic.entity'

import { Member } from './entities/member.entity'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { MemberGallery } from './entities/member-gallery.entity'
import { CreateMemberGalleryDto } from './dto/create-member-gallery.dto'

@Injectable()
export class MemberService implements IThrowException {
  constructor(
    @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
    @InjectRepository(MemberGallery)
    private readonly memberGalleryRepository: Repository<MemberGallery>,
    private readonly characteristicService: CharacteristicService,
    private readonly categoriesServiceService: CategoriesService,
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

    await this.userService.throwExceptionIfNotExist(authorId)
    await this.categoriesServiceService.throwExceptionIfNotExist(categoryId)

    const newMember = this.memberRepository.create({
      category: { id: categoryId },
      author: { id: authorId },
      name,
      description,
    })

    const member = await this.memberRepository.save(newMember)

    const characteristics = await Promise.all(
      characteristicsDto.map(async (characteristicDto) => {
        return this.characteristicService.create(member, characteristicDto)
      })
    )

    member.characteristics = characteristics as Characteristic[]

    return await this.memberRepository.save(member)
  }

  async uploadGallery(id: number, hasMain: boolean, { gallery }: CreateMemberGalleryDto) {
    const member = await this.findOne(id)

    this.throwExceptionIfNotExist(member)

    if (hasMain) {
      await this.updateAll({ isMain: false })
    }

    const newGallery = gallery.map(({ imageUrl, isMain }) =>
      this.memberGalleryRepository.create({ member, imageUrl, isMain })
    )

    return await Promise.all(
      newGallery.map((gallery) => this.memberGalleryRepository.save(gallery))
    )
  }

  findAll() {
    return this.memberRepository.find()
  }

  async findOne(id: number) {
    const member = await this.memberRepository.findOneBy({ id })

    this.throwExceptionIfNotExist(member)

    return member
  }

  async update(id: number, userId: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.throwExceptionIfNotExist(id)
    if (member.authorId !== userId) {
      throw new ForbiddenException('Only author of category member allow to edit it.')
    }
    return this.memberRepository.update(id, updateMemberDto)
  }

  async remove(id: number, userId: number) {
    const member = await this.throwExceptionIfNotExist(id)
    if (member.authorId !== userId) {
      throw new ForbiddenException('Only author of category member allow to delete it.')
    }
    return this.memberRepository.delete(id)
  }

  updateAll(partialMember: QueryDeepPartialEntity<MemberGallery>) {
    return this.memberGalleryRepository.update({}, partialMember)
  }

  throwExceptionIfNotExist(memberOrId: Member | number) {
    if (typeof memberOrId === 'number') {
      return (async () => await this.findOne(memberOrId))()
    } else {
      this.exceptionService.throwIfNotExist(memberOrId, 'member')
    }
  }
}
