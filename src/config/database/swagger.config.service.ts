import { DocumentBuilder } from '@nestjs/swagger';
import { IAuthorizationHeader } from 'src/types/enum/common.type';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Real State API')
  .setDescription('The Real State API description')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    IAuthorizationHeader.BEARER,
  )
  .build();

const theme = new SwaggerTheme();

export const themeOptions = {
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
  swaggerOptions: {
    persistAuthorization: true,
  },
};

export default swaggerConfig;
