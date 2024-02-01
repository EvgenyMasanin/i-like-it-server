import { ApiProperty } from '@nestjs/swagger'

import { Type } from 'class-transformer'
import { IsValidString } from 'src/validation/strings'
import { IsInt, IsOptional, IsPositive } from 'class-validator'
import { QueryPaginationDto } from 'src/common/dto/query-pagination.dto'

export class QueryMemberDto extends QueryPaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsValidString()
  name?: string

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  authorId?: number

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  categoryId?: number
}
