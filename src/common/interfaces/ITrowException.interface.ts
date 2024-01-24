export interface IThrowException {
  throwExceptionIfNotExist(id: number): Promise<unknown>
  throwExceptionIfNotExist<T>(entity: T): void
}
