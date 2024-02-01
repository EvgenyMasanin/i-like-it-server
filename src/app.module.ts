import { join } from 'path'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { MulterModule } from '@nestjs/platform-express'

import { AuthModule } from './auth/auth.module'
import { FileModule } from './file/file.module'
import { HashModule } from './hash/hash.module'
import { RoleModule } from './core/role/role.module'
import { UserModule } from './core/user/user.module'
import { Member, MemberGallery } from './core/member/entities'
import { MemberModule } from './core/member/member.module'
import { User } from './core/user/entities/user.entity'
import { Role } from './core/role/entities/role.entity'
import { ExceptionModule } from './exception/exception.module'
import { CategoriesModule } from './core/categories/categories.module'
import { Category } from './core/categories/entities/category.entity'
import { CharacteristicModule } from './core/characteristic/characteristic.module'
import { Characteristic } from './core/characteristic/entities/characteristic.entity'

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
        entities: [User, Role, Category, Member, MemberGallery, Characteristic],
        synchronize: true,
      }),
    }),
    MulterModule.register({ dest: './static' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    AuthModule,
    UserModule,
    RoleModule,
    HashModule,
    FileModule,
    CategoriesModule,
    MemberModule,
    CharacteristicModule,
    ExceptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
