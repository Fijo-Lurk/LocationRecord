import { join } from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import configuration from '../config/configuration';
import { SqljsConnectionOptions } from 'typeorm/driver/sqljs/SqljsConnectionOptions';
import { Location } from './location/entities/location.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static', 'ui'),
      serveRoot: '/ui/',
    }),

    TypeOrmModule.forRootAsync({
      name: 'default',
      useFactory: () => {
        const sharedDatabaseOptions = {
          dropSchema: process.env.DATABASE_DROP_SCHEMA === 'true',
          entities: [Location],
          keepConnectionAlive: true,
          migrationsTableName: 'typeorm_migrations',
          migrations: [__dirname + '/migrations/*.{ts,js}'],
          migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
          synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
        };
        return <SqljsConnectionOptions>{
          type: 'sqljs',
          location: process.env.DATABASE_URL,
          autoSave: true,
          ...sharedDatabaseOptions,
        };
      },
    }),

    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
    }),
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
