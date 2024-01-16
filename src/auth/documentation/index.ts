import { HttpStatus } from '@nestjs/common'
import { AuthUserDto } from '../dto/auth-user.dto'
import { AuthDto } from '../dto/auth.dto'
import { Tokens } from '../dto/tokens.dto'

export const signupDoc = {
  operation: { summary: 'Creating new user.' },
  body: {
    type: AuthDto,
  },
  responses: [
    { status: HttpStatus.CREATED, type: AuthUserDto },
    { status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' },
  ],
}

export const signinDoc = {
  operation: { summary: 'Getting user by credentials.' },
  body: {
    type: AuthDto,
  },
  responses: [
    { status: HttpStatus.OK, type: AuthUserDto },
    { status: HttpStatus.FORBIDDEN, description: 'Forbidden.' },
  ],
}

export const logoutDoc = {
  operation: { summary: 'Logout.' },
  responses: [{ status: HttpStatus.RESET_CONTENT, description: 'Logout.' }],
}

export const refreshDoc = {
  operation: { summary: 'Getting new access token.' },
  responses: [
    { status: HttpStatus.OK, type: Tokens },
    {
      status: HttpStatus.FORBIDDEN,
      description: 'Access denied because of invalid refresh token.',
    },
  ],
  headers: [{ name: 'authorization', description: 'Bearer refresh token.' }],
}

export const meDoc = {
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
