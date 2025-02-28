import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  database_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
}));
