import { DocumentBuilder } from '@nestjs/swagger';
import { IAuthorizationHeader } from 'src/types/enum/common.type';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Key Vista API')
  .setDescription('The Key Vista API description')
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

const themeOptions = {
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
  swaggerOptions: {
    persistAuthorization: true,
  },
};

export { swaggerConfig, themeOptions };
