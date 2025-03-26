// api/index.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { AppModule } from 'src/app.module';
import { swaggerConfig, themeOptions } from 'src/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, themeOptions);

  await app.init(); // Initialize the app without listening
  return app.getHttpAdapter().getInstance(); // Return the underlying Express/Fastify instance
}

// Export as a Vercel serverless function
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  const server = await bootstrap();
  return server(req, res);
}
