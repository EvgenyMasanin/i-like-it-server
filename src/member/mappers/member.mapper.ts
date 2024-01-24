import { Member } from '../entities/member.entity'

export function memberMapper(member: Member) {
  const {
    author: { avatarURL, username },
    category,
    ...memberDto
  } = member
  return { ...memberDto, authorAvatarUrl: avatarURL, username }
}
