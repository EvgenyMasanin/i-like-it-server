import { DeleteResult } from 'typeorm'

import { WithPagination } from 'src/response-interceptors/transform-to-response-dto/model'

import { QueryPaginationDto } from '../dto/query-pagination.dto'

export interface CRUDController<Entity, CreateEntityDto, UpdateEntityDto, QueryDto> {
  create(userId: number, createEntityDto: CreateEntityDto, ...rest: unknown[]): Promise<Entity>

  //TODO add check id === userId to auth jwt strategy
  update(
    id: string,
    updateEntityDto: UpdateEntityDto,
    userId?: number,
    ...rest: unknown[]
  ): Promise<Entity>
  remove(id: string, userId?: number, ...rest: unknown[]): Promise<DeleteResult>

  findAll(queryPaginationDto: QueryPaginationDto): Promise<WithPagination<Entity>>

  findAllByFilter(filterDto: QueryDto): Promise<WithPagination<Entity>>

  findOne(id: string | number): Promise<Entity>
}
