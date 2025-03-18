import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { PropertiesModule } from './api/properties/properties.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI', ''),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PropertiesModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
