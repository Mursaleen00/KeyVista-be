import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/register.schema';
import { PropertyPurpose } from 'src/enum/property-purpose';
import { FilterQueryT } from 'src/types/filter-query';
import { updateResponse } from 'src/utils/update-response';
import { Property, PropertyDocument } from '../../schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Property.name)
    private readonly PropertyModel: Model<PropertyDocument>,
  ) {}

  // ================ Create a new property ================
  async create(createPropertyDto: CreatePropertyDto, id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException('User not found');

      const createProperty = await this.PropertyModel.create({
        ...createPropertyDto,
        ownerId: user?._id,
      });

      return {
        message: 'Property created successfully',
        data: createProperty,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ================ Find all properties ================
  async findAll(filters: FilterDto) {
    try {
      const query: FilterQueryT = {};

      if (filters.city) query.city = { $regex: filters.city, $options: 'i' };

      if (filters.area) query.area = { $regex: filters.area, $options: 'i' };

      if (filters.kind) query.kind = filters.kind;

      if (filters.purpose) query.purpose = filters.purpose;

      if (filters.beds !== undefined) query.beds = filters.beds;

      if (filters.priceFrom || filters.priceTo) {
        query.price = {};
        if (filters.priceFrom) query.price.$gte = filters.priceFrom;
        if (filters.priceTo) query.price.$lte = filters.priceTo;
      }

      if (filters.sizeFrom || filters.sizeTo) {
        query.size = {};
        if (filters.sizeFrom) query.size.$gte = filters.sizeFrom;
        if (filters.sizeTo) query.size.$lte = filters.sizeTo;
      }

      const total = await this.PropertyModel.countDocuments(query);

      const page = Number(filters.page) || 1;
      const limit = Number(filters.limit) || 10;
      const skip = (page - 1) * limit;

      const properties = await this.PropertyModel.find(query)
        .skip(skip)
        .limit(limit)
        .exec();

      return {
        properties,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ================ Find my all properties ================
  async findMyProperties(userId: string) {
    try {
      const properties = await this.PropertyModel.find({ ownerId: userId });
      return { properties: properties ?? [] };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ================ Find my all properties ================
  async findMapPoints(type: PropertyPurpose) {
    try {
      const properties = await this.PropertyModel.find({ purpose: type });

      if (!properties) return { points: [], properties: [] };

      const points = properties.map((property) => ({
        lat: property?.position?.lat ?? 0,
        lng: property?.position?.lng ?? 0,
        name: property?.name,
        id: property?._id,
        price: property?.price,
        image: property?.thumbnail,
      }));

      return { points, properties };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ================ Find a property by id ================
  async findOne(id: string) {
    try {
      const property = await this.PropertyModel.findById(id).exec();
      if (!property) throw new NotFoundException('Property not found');

      const user = await this.userModel.findById(property.ownerId).exec();
      if (!user) throw new NotFoundException('User not found');

      const updatedUser = updateResponse({ user });

      const data = {
        property: property.toObject(),
        user: updatedUser.updatedUser,
      };

      return { data: data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ================ Update a property ================
  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
    userId: string,
  ) {
    try {
      const property = await this.PropertyModel.findById(id);
      if (!property) throw new NotFoundException('Property not found');

      if (property.ownerId.toString() !== userId) {
        throw new NotFoundException(
          'You are not authorized to update this property',
        );
      }

      const updatedProperty = await this.PropertyModel.findByIdAndUpdate(
        id,
        updatePropertyDto,
        { new: true },
      );

      return {
        message: 'Property updated successfully',
        data: updatedProperty,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ================ Delete a property ================
  async remove(id: string, userId: string) {
    try {
      const property = await this.PropertyModel.findById(id);
      if (!property) throw new NotFoundException('Property not found');

      if (property.ownerId.toString() !== userId) {
        throw new NotFoundException(
          'You are not authorized to delete this property',
        );
      }

      const deletedProperty = await this.PropertyModel.findByIdAndDelete(id);

      return {
        property: deletedProperty,
        message: 'Property deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
