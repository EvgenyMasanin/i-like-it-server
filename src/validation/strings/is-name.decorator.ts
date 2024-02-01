import { applyDecorators } from '@nestjs/common'

import { IsString, Matches } from 'class-validator'

const matchUsername = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/

export const IsName = () => applyDecorators(IsString(), Matches(matchUsername, { each: true }))
