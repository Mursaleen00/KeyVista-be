import { BadRequestException, Injectable } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

@Injectable()
export class uploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: 'profile' | 'properties',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: `key-vista/${folder}` },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as UploadApiResponse);
          },
        );
        toStream(file.buffer).pipe(upload);
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
