import { ConfigService } from '@nestjs/config'
import { Inject, Injectable } from '@nestjs/common'
import amqp from 'amqp-connection-manager'
import { ClientProxy } from '@nestjs/microservices'

import { EventEmitter } from 'stream'
import { MicroService } from 'src/rmq'

import { ConfirmationEmailDto } from './dto/confirmation-email.dto'

@Injectable()
export class MailService {
  constructor(
    @Inject(MicroService.MAIL_SERVICE) private client: ClientProxy,
    private readonly configService: ConfigService
  ) {}

  sentConfirmationEmail({ email, username, confirmationUrl }: ConfirmationEmailDto) {
    this.client.emit('mail', { email, username, confirmationUrl })
  }

  async testChannel() {
    const user = this.configService.get<string>('RABBITMQ_USER')
    const password = this.configService.get<string>('RABBITMQ_PASSWORD')
    const host = this.configService.get<string>('RABBITMQ_URL')

    const port = this.configService.get<string>('RABBITMQ_PORT')

    const connection = amqp.connect(`amqp://${user}:${password}@${host}:${port}`)
    console.log('🚀 ~ testChannel ~ connection:', connection)

    const channel = connection.createChannel({ name: 'testchannel' })
    await channel.assertQueue('test-queue')
    await channel.sendToQueue('test-queue', Buffer.from('qwerty'))
    await channel.close()
    await connection.close()
    // channel.publish('test', 'qwerty')
    // console.log('🚀 ~ testChannel ~ chanel:', channel)
  }
}
