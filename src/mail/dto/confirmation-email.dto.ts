import { IsEmail, IsString } from 'class-validator'
import { IsName } from 'src/validation/strings'

export class ConfirmationEmailDto {
  @IsEmail()
  email: string
  @IsName()
  username: string
  @IsString()
  confirmationUrl: string
}
