import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { HashModule } from 'src/hash/hash.module'
import { FileModule } from 'src/file/file.module'
import { RoleModule } from 'src/core/role/role.module'
import { UserModule } from 'src/core/user/user.module'
import { AtJwtStrategy, RtJwtStrategy } from 'src/auth/strategies'
import { User } from 'src/core/user/entities/user.entity'
import { Role } from 'src/core/role/entities/role.entity'

import { AuthModule } from './auth.module'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  let app: INestApplication

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        UserModule,
        HashModule,
        RoleModule,
        FileModule,
        TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({}),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('POSTGRES_HOST'),
            port: configService.get('POSTGRES_PORT'),
            username: configService.get('POSTGRES_USER'),
            password: configService.get('POSTGRES_PASSWORD'),
            database: configService.get('POSTGRES_DB'),
            // entities: [`${__dirname}/**/*.entity.ts`],
            entities: [User, Role],
            synchronize: true,
          }),
        }),
      ],
      providers: [AuthService, RtJwtStrategy, AtJwtStrategy],
    }).compile()

    service = module.get<AuthService>(AuthService)

    app = module.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be defined', async () => {
    expect(service).toBeDefined()
  })
})
