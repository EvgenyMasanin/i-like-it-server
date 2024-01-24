import { MemberGallery } from '../entities/member-gallery.entity'

export class CreateMemberGalleryDto {
  gallery: Pick<MemberGallery, 'imageUrl' | 'isMain'>[]
}
