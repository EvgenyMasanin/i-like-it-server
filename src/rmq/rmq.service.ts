import * as amqp from 'amqplib'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RmqOptions } from '@nestjs/microservices'

import { getOptions } from './helpers'

@Injectable()
export class RmqService {
  private connection: amqp.Connection
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return getOptions(this.configService, queue, noAck)
  }
}
