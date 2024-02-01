/* eslint-disable @typescript-eslint/ban-types */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(dto: Record<string, unknown>, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return dto
    }

    const object = plainToInstance(metatype, dto)
    const errors = await validate(object)

    const errorMessages = errors.reduce((acc, error) => {
      acc[error.property] = Object.values(error.constraints)
      return acc
    }, {} as Record<string, string[]>)

    if (errors.length > 0) {
      throw new BadRequestException({ code: 400, messages: errorMessages, error: 'Bad request' })
    }
    return object
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
