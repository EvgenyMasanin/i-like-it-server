import { ApiProperty } from '@nestjs/swagger'

export class FilterDto {
  @ApiProperty({ example: '42' })
  userId: string
}
