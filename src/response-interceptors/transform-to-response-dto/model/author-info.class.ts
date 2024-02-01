import { ApiProperty } from '@nestjs/swagger'

import { Constructor } from 'src/common/interfaces'

export function AuthorInfo<Entity extends Constructor>(Entity: Entity) {
  abstract class AbstractAuthorInfo extends Entity {
    @ApiProperty({ example: 'avatars/3ae56ab5926a103d49072e76cd288ae28.jpg' })
    authorAvatarURL: string

    @ApiProperty({ example: 'Inexorable' })
    authorName: string
  }

  return AbstractAuthorInfo
}
