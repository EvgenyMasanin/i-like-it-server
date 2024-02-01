import { OmitType } from '@nestjs/swagger'

import { Characteristic } from '../entities/characteristic.entity'

export class CreateCharacteristicDto extends OmitType(Characteristic, ['id', 'member'] as const) {}
