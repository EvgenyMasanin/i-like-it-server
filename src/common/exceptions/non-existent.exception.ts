import { BadRequestException } from '@nestjs/common'

export const getNonExistentEntityExceptionMessage = (entityName: string) =>
  `There is no ${entityName} with provided id!`

export class NonExistentEntityException extends BadRequestException {
  constructor(entityName: string) {
    super(getNonExistentEntityExceptionMessage(entityName))
  }
}
