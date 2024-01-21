import { HttpStatus } from '@nestjs/common'

import { IDocumentation } from 'src/common/decorators'
import { NonExistentUser } from 'src/common/errors/user/non-existent-user'

import { Category } from '../entities/category.entity'

export const createDoc: IDocumentation = {
  operation: { summary: 'Creating new category.' },
  consumes: 'multipart/form-data',
}

export const findAllByAuthorDoc: IDocumentation = {
  responses: [
    { status: HttpStatus.OK, type: [Category] },
    { status: HttpStatus.BAD_REQUEST, type: NonExistentUser },
  ],
  operation: { summary: 'Getting users categories.' },
}

export const findAllDoc: IDocumentation = {
  responses: [{ status: HttpStatus.OK, type: [Category] }],
}

export const findOneDoc: IDocumentation = {
  responses: [
    { status: HttpStatus.OK, type: Category },
    { status: HttpStatus.BAD_REQUEST, type: NonExistentUser },
  ],
}

export const updateDoc: IDocumentation = {
  responses: [
    { status: HttpStatus.OK, type: Category },
    { status: HttpStatus.BAD_REQUEST, type: NonExistentUser },
  ],
}

//TODO: show message
export const removeDoc: IDocumentation = {
  responses: [{ status: HttpStatus.OK }, { status: HttpStatus.BAD_REQUEST, type: NonExistentUser }],
}
