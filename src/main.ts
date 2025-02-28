import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

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

  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Real State API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  await app.listen(process.env.PORT || 2000);
  return app.getHttpAdapter().getInstance() as Express;
}

// Vercel serverless handler
export default async function handler(req: any, res: any) {
  const server = await bootstrap();
  return server(req, res);
}

// Local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((expressApp) => {
    const port = process.env.PORT || 2000;
    console.log(`Server running on http://localhost:${port}/api`);
  });
}
