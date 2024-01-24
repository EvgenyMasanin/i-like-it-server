import { HttpStatus } from '@nestjs/common'
import { OmitType } from '@nestjs/swagger'

import {
  ApiTag,
  FILE_SCHEMA,
  NOT_EXISTING_ENTITY_RESPONSE,
  UNAUTHORIZED_RESPONSE,
} from 'src/apiDocumentation'
import { IDocumentation } from 'src/common/decorators'
import { FORBIDDEN_RESPONSE } from 'src/apiDocumentation/responses/forbidden'

import { Member, MemberGallery } from '../entities'

const NOT_EXISTING_MEMBER_RESPONSE = NOT_EXISTING_ENTITY_RESPONSE('category')

export const CREATE_MEMBER_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Creating new category member.' },
  responses: [
    {
      status: HttpStatus.CREATED,
      type: OmitType(Member, ['author', 'category'] as const),
    },
    UNAUTHORIZED_RESPONSE,
    NOT_EXISTING_MEMBER_RESPONSE,
  ],
}

export const UPLOAD_GALLERY_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Uploading members gallery.' },
  consumes: 'multipart/form-data',
  body: {
    description: 'Images in jpg format.',
    schema: FILE_SCHEMA,
  },
  responses: [
    {
      status: HttpStatus.CREATED,
      type: [MemberGallery],
    },
    UNAUTHORIZED_RESPONSE,
    NOT_EXISTING_MEMBER_RESPONSE,
  ],
}

export const FIND_ALL_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Finding all members.' },
  responses: [{ status: HttpStatus.OK, type: [Member] }],
  tags: [ApiTag.public],
}

export const FIND_ONE_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Finding member by id.' },
  responses: [{ status: HttpStatus.OK, type: Member }, NOT_EXISTING_MEMBER_RESPONSE],
  tags: [ApiTag.public],
}

export const UPDATE_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Updating member.' },
  responses: [
    { status: HttpStatus.OK, type: Member },
    NOT_EXISTING_MEMBER_RESPONSE,
    FORBIDDEN_RESPONSE,
  ],
}

export const REMOVE_DOCUMENTATION: IDocumentation = {
  operation: { summary: 'Deleting member.' },
  responses: [{ status: HttpStatus.NO_CONTENT }, NOT_EXISTING_MEMBER_RESPONSE, FORBIDDEN_RESPONSE],
}
