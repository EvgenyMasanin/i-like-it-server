import { IsEmail, Min } from 'class-validator'

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be valid!' })
  email: string
  @Min(8, { message: 'Min password length is 8 symbols!' })
  password: string

  rolesId?: number[]
}
