import { HashModule } from 'src/hash/hash.module'
import { HashService } from 'src/hash/hash.service'
import { Role } from 'src/role/entities/role.entity'
import { RoleModule } from 'src/role/role.module'
import { User } from 'src/user/entities/user.entity'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'

import { INestApplication } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'

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
        TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot({ isGlobal: true }),
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
      providers: [AuthService, UserService, HashService, JwtService, ConfigService],
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
