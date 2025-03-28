import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from '../../schemas/favorite.schema';
import { Property, PropertyDocument } from '../../schemas/property.schema';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name)
    private readonly favoriteModel: Model<FavoriteDocument>,
    @InjectModel(Property.name)
    private readonly PropertyModel: Model<PropertyDocument>,
  ) {}

  async findAll({ userId }: { userId: string }) {
    try {
      const favorite = await this.favoriteModel.find({ userId });

      if (favorite.length === 0)
        return { message: 'No favorite found', properties: [] };

      const properties = await this.PropertyModel.find({
        _id: { $in: favorite.flatMap((item) => item.propertyIds) },
      }).exec();

      return { properties: properties ?? [] };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addToFavorite({
    userId,
    propertyId,
  }: {
    userId: string;
    propertyId: string;
  }) {
    try {
      const favorite = await this.favoriteModel.findOne({ userId });

      if (!favorite) {
        const newFavorite = new this.favoriteModel({
          userId,
          propertyIds: [propertyId],
        });
        await newFavorite.save();
        return { message: 'Property added to favorite', favorite: newFavorite };
      }

      if (!favorite.propertyIds.includes(propertyId)) {
        favorite.propertyIds.push(propertyId);
        await favorite.save();
        return { message: 'Property added to favorite', favorite };
      }

      if (favorite.propertyIds.includes(propertyId)) {
        favorite.propertyIds.splice(
          favorite.propertyIds.indexOf(propertyId),
          1,
        );
        await favorite.save();
        return { message: 'Property already in favorite', favorite };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
