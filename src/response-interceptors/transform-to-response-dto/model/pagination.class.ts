import { ApiProperty } from '@nestjs/swagger'

export class Pagination {
  @ApiProperty()
  offset: number
  @ApiProperty()
  limit: number
  @ApiProperty()
  total: number
}
