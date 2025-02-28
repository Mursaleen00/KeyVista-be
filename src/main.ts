import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Express } from 'express';
import { join } from 'path';
import * as swaggerUi from 'swagger-ui-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Real State API')
    .setDescription('The Real State API description')
    .setVersion('1.0')
    .addTag('auth', 'Authentication-related endpoints')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.use(
    '/api',
    swaggerUi.serveFiles(join(__dirname, '../node_modules/swagger-ui-dist')),
    swaggerUi.setup(document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    }),
  );

  await app.init();
  return expressApp;
}

export default async (req: any, res: any) => {
  const server = await bootstrap();
  server(req, res);
};

if (process.env.NODE_ENV !== 'production') {
  (async () => {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('Real State API')
      .setDescription('The Real State API description')
      .setVersion('1.0')
      .addTag('auth', 'Authentication-related endpoints')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'JWT-auth',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);

    const expressApp = app.getHttpAdapter().getInstance() as Express;
    expressApp.use(
      '/api',
      swaggerUi.serveFiles(join(__dirname, '../node_modules/swagger-ui-dist')),
      swaggerUi.setup(document, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      }),
    );

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Server running on http://localhost:${port}/api`);
  })();
}
