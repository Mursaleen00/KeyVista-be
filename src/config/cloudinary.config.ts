import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({});

import { v2 } from 'cloudinary';
import { CLOUDINARY } from 'src/constant/cloudnary.constant';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
