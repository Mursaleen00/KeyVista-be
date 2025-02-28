import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';
import * as swaggerUi from 'swagger-ui-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

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

  // Manually serve Swagger UI
  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'Real State API Docs',
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
    const configService = app.get(ConfigService);

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
      '/api/docs',
      swaggerUi.serve,
      swaggerUi.setup(document, {
        swaggerOptions: {
          persistAuthorization: true,
        },
        customSiteTitle: 'Real State API Docs',
      }),
    );

    const port = configService.get<number>('PORT', 3000);
    await app.listen(port);
    console.log(`Server running on http://localhost:${port}/api/docs`);
  })();
}
