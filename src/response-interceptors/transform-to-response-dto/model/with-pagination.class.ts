import { ApiProperty } from '@nestjs/swagger'

import { Constructor } from 'src/common/interfaces'

import { Pagination } from './pagination.class'
import { WithPagination } from './with-pagination.interface'

export function WithPagination<Entity extends Constructor>(Entity: Entity) {
  class AbstractWithPagination implements WithPagination<Entity> {
    @ApiProperty({ type: [Entity] })
    data: Entity[]
    @ApiProperty()
    pagination: Pagination
  }

  Object.defineProperty(AbstractWithPagination, 'name', {
    value: `WithPagination${Entity.name}}`,
  })

  return AbstractWithPagination
}
