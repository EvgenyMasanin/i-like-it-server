import { HttpStatus } from '@nestjs/common'

import { ApiTag } from 'src/api-documentation'
import { IDocumentation } from 'src/api-documentation/decorators'
import { UNAUTHORIZED_RESPONSE } from 'src/api-documentation/responses'

import { AuthDto } from '../dto/auth.dto'
import { Tokens } from '../dto/tokens.dto'
import { SigninDto } from '../dto/signin.dto'
import { AuthUserDto } from '../dto/auth-user.dto'

export const SIGNUP_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Creating new user.' },
  body: {
    type: AuthDto,
  },
  responses: [{ status: HttpStatus.CREATED, type: AuthUserDto }, UNAUTHORIZED_RESPONSE],
  tags: [ApiTag.public],
}

export const SIGNIN_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Getting user by credentials.' },
  body: {
    type: SigninDto,
  },
  responses: [{ status: HttpStatus.OK, type: AuthUserDto }, UNAUTHORIZED_RESPONSE],
  tags: [ApiTag.public],
}

export const LOGOUT_DOCUMENTATION = {
  operation: { summary: 'Logout.' },
  responses: [{ status: HttpStatus.RESET_CONTENT, description: 'Logout.' }],
}

export const REFRESH_DOCUMENTATION = {
  operation: { summary: 'Getting new access token.' },
  responses: [
    { status: HttpStatus.OK, type: Tokens },
    {
      status: HttpStatus.UNAUTHORIZED,
      description: 'Access denied because of invalid refresh token.',
    },
  ],
  headers: [{ name: 'authorization', description: 'Bearer refresh token.' }],
}

export const ME_DOCUMENTATION = {
  operation: { summary: 'Getting current user data by access token.' },
  responses: [
    { status: HttpStatus.OK, type: AuthUserDto },
    {
      status: HttpStatus.FORBIDDEN,
      description: 'Access denied because of invalid access token.',
    },
  ],
  headers: [{ name: 'authorization', description: 'Bearer access token.' }],
}
