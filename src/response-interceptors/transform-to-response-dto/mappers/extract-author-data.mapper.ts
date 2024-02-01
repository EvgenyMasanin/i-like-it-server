import { instanceToPlain } from 'class-transformer'
import { User } from 'src/core/user/entities/user.entity'

export interface ExtractedAuthor {
  authorName: string
  authorAvatarURL: string
}

export function extractAuthorData<T extends { author: User }>(
  entity: T
): Omit<T, 'author'> & ExtractedAuthor {
  const {
    author: { username, avatarURL },
    ...EntityDto
  } = instanceToPlain(entity) as T

  return { ...EntityDto, authorName: username, authorAvatarURL: avatarURL }
}
