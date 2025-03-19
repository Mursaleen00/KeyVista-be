import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/entity/register.entity';
import { Reviews, ReviewsSchema } from './entities/reviews.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import {
  Property,
  PropertySchema,
} from '../properties/entities/property.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Reviews.name, schema: ReviewsSchema },
      { name: Property.name, schema: PropertySchema },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, JwtService],
})
export class ReviewsModule {}
