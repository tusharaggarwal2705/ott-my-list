import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({path:'.env'});

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Content API')
    .setDescription('The Content API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/api-docs', express.static('public/swagger'));

  await app.listen(5001);
}
bootstrap();
