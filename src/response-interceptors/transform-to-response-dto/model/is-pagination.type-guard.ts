import { WithPagination } from './with-pagination.interface'

export const isPagination = <T>(object: unknown): object is WithPagination<T> => {
  if (typeof object !== 'object') return false
  return 'pagination' in object
}
