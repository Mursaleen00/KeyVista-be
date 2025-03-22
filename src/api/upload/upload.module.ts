import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { uploadController } from './upload.controller';
import { uploadService } from './upload.service';
import { CloudinaryProvider } from 'src/config/cloudinary.config';

@Module({
  controllers: [uploadController],
  providers: [uploadService, JwtService, CloudinaryProvider],
  exports: [CloudinaryProvider, uploadService],
})
export class UploadModule {}
