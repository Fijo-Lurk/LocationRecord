import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import config from 'ormconfig';
import { Location } from './location/entities/location.entity';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';

@Module({
  imports: [
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
