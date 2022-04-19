import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { getConnection } from 'typeorm';
import { MyLogger } from '../config/logger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: new MyLogger(),
    });
    app.enableCors({ origin: process.env.WEB_CLIENT_HOST });
    // NOTE: database connect
    const connection = getConnection();
    const { isConnected } = connection;
    isConnected
      ? Logger.log(`🌨️  Database connected`, 'TypeORM', false)
      : Logger.error(`❌  Database connect error`, '', 'TypeORM', false);

    //swagger config
    const config = new DocumentBuilder()
      .setTitle('Location api example')
      .setDescription(
        'The Location API Service provides a REST API for mapping a Studio deployment URL to a specific application ID in a specific customer environment.',
      )
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('location/v1/docs', app, document);

    // NOTE: global nest setup
    app.useGlobalPipes(new ValidationPipe());

    app.enableShutdownHooks();

    await app.listen(process.env.WEB_SERVER_PORT || 3000);
    Logger.log(`🌍  Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
  }
}

bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
