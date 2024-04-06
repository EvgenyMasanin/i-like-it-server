import { DeleteResult } from 'typeorm'

import { IThrowException } from 'src/exception/interfaces'
import { WithPagination } from 'src/response-interceptors/transform-to-response-dto/model'

import { QueryPaginationDto } from '../dto/query-pagination.dto'

export interface CRUDService<Entity, CreateEntityDto, UpdateEntityDto, QueryDto>
  extends IThrowException {
  create(createEntityDto: CreateEntityDto, ...rest: unknown[]): Promise<Entity>

  //TODO add check id === userId to auth jwt strategy
  update(
    id: number,
    updateEntityDto: UpdateEntityDto,
    userId?: number,
    ...rest: unknown[]
  ): Promise<Entity>
  remove(id: number, userId?: number, ...rest: unknown[]): Promise<DeleteResult>

  findAll(filterDto: QueryDto): Promise<WithPagination<Entity>>

  findOne(id: number): Promise<Entity>
}
