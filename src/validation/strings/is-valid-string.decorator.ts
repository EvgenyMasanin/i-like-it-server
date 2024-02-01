import { applyDecorators } from '@nestjs/common'

import { IsString, Matches } from 'class-validator'

//TODO: add regexp for sentences
const matchValidString = new RegExp(/./)

export const IsValidString = () =>
  applyDecorators(IsString(), Matches(matchValidString, { each: true }))
