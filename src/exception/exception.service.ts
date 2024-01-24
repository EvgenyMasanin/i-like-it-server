import { Injectable } from '@nestjs/common'

import { NonExistentEntityException } from 'src/common/exceptions/non-existent.exception'

@Injectable()
export class ExceptionService {
  throwIfNotExist<T>(entity: T, entityName: string) {
    if (!entity) throw new NonExistentEntityException(entityName)
  }
}
