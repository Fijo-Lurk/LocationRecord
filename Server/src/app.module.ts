import { join } from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import config from 'ormconfig';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static', 'ui'),
      serveRoot: '/ui/',
    }),
    TypeOrmModule.forRoot(config),
    LocationModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
    }),

    /*     TypeOrmModule.forFeature([Location]), */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
