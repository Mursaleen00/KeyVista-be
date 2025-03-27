import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './module/auth/auth.module';
import { ChatsModule } from './module/chats/chats.module';
import { FavoriteModule } from './module/favorite/favorite.module';
import { NotificationModule } from './module/notification/notification.module';
import { PropertiesModule } from './module/properties/properties.module';
import { ReviewsModule } from './module/reviews/reviews.module';
import { UploadModule } from './module/upload/upload.module';
import { UserModule } from './module/user/user.module';

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
    PropertiesModule,
    UserModule,
    ReviewsModule,
    ChatsModule,
    NotificationModule,
    FavoriteModule,
    UploadModule,
  ],
  providers: [],
})
export class AppModule {}
