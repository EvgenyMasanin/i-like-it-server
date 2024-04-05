import { ConfigService } from '@nestjs/config'
import { RmqOptions, Transport } from '@nestjs/microservices'

export function getOptions(configService: ConfigService, queue: string, noAck = false): RmqOptions {
  const user = configService.get<string>('RABBITMQ_USER')
  const password = configService.get<string>('RABBITMQ_PASSWORD')
  const host = configService.get<string>('RABBITMQ_URL')

  const port = configService.get<string>('RABBITMQ_PORT')

  return {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}:${port}`],
      queue,
      noAck,
      persistent: true,
      queueOptions: {
        durable: false,
      },
    },
  }
}
