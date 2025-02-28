import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';

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
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.init();
  return app.getHttpAdapter().getInstance() as Express;
}

export default async (req: any, res: any) => {
  const server = await bootstrap();
  server(req, res);
};

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(async (expressApp) => {
    const app = await NestFactory.create(AppModule); // Re-create for listen
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 3000);
    await app.listen(port);
    console.log(`Server running on http://localhost:${port}/api`);
  });
}
