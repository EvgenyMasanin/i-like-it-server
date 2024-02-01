import { Pagination } from './pagination.class'
import { OneOrMore } from '../interfaces/one-or-more.type'

export interface WithPagination<T> {
  data: OneOrMore<T>
  pagination: Pagination
}
