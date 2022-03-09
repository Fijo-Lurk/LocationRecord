import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import config from 'ormconfig';
import { Location } from './location/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    LocationModule,
    /*     TypeOrmModule.forFeature([Location]), */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
