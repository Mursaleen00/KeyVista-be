import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './api/auth/auth.module';
import { PropertiesModule } from './api/properties/properties.module';
import { ReviewsModule } from './api/reviews/reviews.module';
import { uploadModule } from './api/upload/upload.module';
import { UserModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { FavoriteModule } from './api/favorite/favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './uploads',
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
    uploadModule,
    ReviewsModule,
    FavoriteModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
