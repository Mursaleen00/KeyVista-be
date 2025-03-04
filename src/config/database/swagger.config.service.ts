import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Real State API')
  .setDescription('The Real State API description')
  .setVersion('1.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'JWT-auth',
  )
  .build();

export default swaggerConfig;
