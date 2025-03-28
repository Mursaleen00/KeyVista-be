import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/register.schema';
import { Property, PropertyDocument } from '../../schemas/property.schema';
import { Reviews, ReviewsDocument } from '../../schemas/reviews.schema';
import { CreateReviewsDto } from './dto/create-reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Property.name)
    private readonly PropertyModel: Model<PropertyDocument>,
    @InjectModel(Reviews.name)
    private readonly ReviewsModel: Model<ReviewsDocument>,
  ) {}

  // ===================== GET RATINGS ======================
  async getRatings(propertyId: string) {
    try {
      const ratings = await this.ReviewsModel.find({ propertyId });

      const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

      ratings.forEach((rating) => {
        const ratingValue = Math.min(Math.floor(rating.rating), 5);
        ratingCounts[ratingValue] += 1;
      });

      const totalRatings = ratings.length;

      const ratingPercentages = {};
      for (const [ratingValue, count] of Object.entries(ratingCounts)) {
        const percentage =
          totalRatings > 0 ? ((count / totalRatings) * 100).toFixed(2) : 0;
        ratingPercentages[ratingValue] = +percentage;
      }

      const average =
        ratings.reduce((a, b) => a + b.rating, 0) / ratings.length;

      return {
        reviews: totalRatings,
        average: +average.toFixed(1) || 0,
        ratings: ratingCounts,
        percentages: ratingPercentages,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ===================== GET REVIEWS ======================
  async getReviews(propertyId: string) {
    try {
      const reviews = await this.ReviewsModel.find({ propertyId });

      const userIds = reviews.map((review) => review.userId);
      const user = await this.userModel.find({ _id: { $in: userIds } });

      const res = user.map((user) => {
        const review = reviews.find(
          (review) => review.userId === user._id.toString(),
        );

        return {
          _id: user._id,
          fullName: user.fullName,
          profilePicture: user.profilePicture,
          description: review?.description,
          rating: review?.rating,
        };
      });

      return {
        reviews: res,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ===================== CREATE REVIEWS ===================
  async create({
    userId,
    rating,
    propertyId,
    description,
  }: { userId: string } & CreateReviewsDto) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) throw new NotFoundException('User not found');

      const property = await this.PropertyModel.findById(propertyId);
      if (!property) throw new NotFoundException('Property not found');

      const ratings = await this.ReviewsModel.find({ propertyId });

      if (!ratings) {
        await this.ReviewsModel.create({
          propertyId,
          userId,
          rating: rating,
          description: description,
        });
        return { message: 'Review created successfully' };
      } else {
        await this.ReviewsModel.findOneAndUpdate(
          { rating },
          {
            rating: rating,
            description: description,
          },
        );
        return { message: 'Review updated successfully' };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
