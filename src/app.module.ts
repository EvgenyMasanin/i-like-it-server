import { join } from 'path'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { MulterModule } from '@nestjs/platform-express'

import { AuthModule } from './auth/auth.module'
import { HashModule } from './hash/hash.module'
import { RoleModule } from './role/role.module'
import { UserModule } from './user/user.module'
import { FileModule } from './file/file.module'
import { User } from './user/entities/user.entity'
import { Role } from './role/entities/role.entity'
import { CategoriesModule } from './categories/categories.module'
import { Category } from './categories/entities/category.entity'

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
        entities: [User, Role, Category],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
