import { ApiProperty } from '@nestjs/swagger'

import { IsOptional } from 'class-validator'
import { IsValidString } from 'src/validation/strings'
import { QueryPaginationDto } from 'src/common/dto/query-pagination.dto'

export class QueryUserDto extends QueryPaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsValidString()
  username?: string
}
