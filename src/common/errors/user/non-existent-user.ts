import { BadRequestException } from '@nestjs/common'

export class NonExistentUser extends BadRequestException {
  constructor() {
    super('There is no user with provided id.')
  }
}
