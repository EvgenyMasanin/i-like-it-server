import { SetMetadata } from '@nestjs/common'

export const EXCLUDE_TRANSFORM_TO_RESPONSE_DTO = 'EXCLUDE_TRANSFORM_TO_RESPONSE_DTO'

export const ExcludeTransformToResponseDto = () =>
  SetMetadata(EXCLUDE_TRANSFORM_TO_RESPONSE_DTO, true)
