import { HttpStatus } from '@nestjs/common'

import { getNonExistentEntityExceptionMessage } from 'src/common/exceptions/non-existent.exception'

export const NOT_EXISTING_ENTITY_RESPONSE = (entityName: string) =>
  ({
    status: HttpStatus.BAD_REQUEST,
    description: getNonExistentEntityExceptionMessage(entityName),
  } as const)
