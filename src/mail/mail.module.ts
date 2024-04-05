import { Module } from '@nestjs/common'

import { MicroService } from 'src/rmq'
import { RmqModule } from 'src/rmq/rmq.module'

import { MailService } from './mail.service'

@Module({
  providers: [MailService],
  imports: [RmqModule.register({ name: MicroService.MAIL_SERVICE })],
  exports: [MailService],
})
export class MailModule {}
