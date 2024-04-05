import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { getOptions } from './helpers'
import { RmqService } from './rmq.service'

interface RmqModuleOptions {
  name: string
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
              getOptions(configService, configService.get<string>('RABBITMQ_QUEUE'), true),
          },
        ]),
      ],
      exports: [ClientsModule],
    }
  }
}
