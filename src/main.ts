import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import serverless from 'serverless-http';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.init();

  // If running locally, listen on port 3000
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(8080);
    console.log('Application is running on: http://localhost:8080');
  }
}

bootstrap();

// Export the handler for Vercel deployment
export const handler = serverless(expressApp);
