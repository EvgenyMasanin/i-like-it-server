import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { HashModule } from './hash/hash.module'
import { MockService } from './mock/mock.service'
import { Role } from './role/entities/role.entity'
import { RoleModule } from './role/role.module'
import { RoleService } from './role/role.service'
import { User } from './user/entities/user.entity'
import { UserModule } from './user/user.module'
import { UserService } from './user/user.service'

@Module({
  imports: [
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
    AuthModule,
    UserModule,
    RoleModule,
    HashModule,
  ],
  controllers: [],
  providers: [MockService],
})
export class AppModule {}
