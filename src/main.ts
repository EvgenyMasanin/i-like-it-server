import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { AccessTokenGuard } from './auth/guards/access-token.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Test backend')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('Test API')
    .build()

  app.enableCors()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  const reflector = new Reflector()

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new AccessTokenGuard(reflector))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  const PORT = 5000

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}
bootstrap()
