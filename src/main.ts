import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

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

  // Use SwaggerModule.setup for consistent behavior across environments
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Real State API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  return app;
}

// For serverless environments
export default async (req: Request, res: Response): Promise<void> => {
  const app = await bootstrap();
  const instance = app.getHttpAdapter().getInstance() as (
    req: Request,
    res: Response,
  ) => void;
  return instance(req, res);
};

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) => {
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 3000);
    console.log(`Server running on http://localhost:${port}/api`);
  });
}
