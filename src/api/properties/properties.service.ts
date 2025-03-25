import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterQueryT } from 'src/types/types/filter-query';
import { updateResponse } from 'src/utils/update-response';
import { User, UserDocument } from '../auth/entity/register.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property, PropertyDocument } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Property.name)
    private readonly PropertyModel: Model<PropertyDocument>,
  ) {}

  // ================ Create a new property ================
  async create(createPropertyDto: CreatePropertyDto, id: string) {
    const user = await this.userModel.findById(id);

    const createProperty = await this.PropertyModel.create({
      ...createPropertyDto,
      ownerId: user?._id,
    });

    return {
      message: 'Property created successfully',
      data: createProperty,
    };
  }

  // ================ Find all properties ================
  async findAll(filters: FilterDto) {
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
  }

  // ================ Find my all properties ================
  async findMyProperties(userId: string) {
    const properties = await this.PropertyModel.find({ ownerId: userId });
    return { properties: properties ?? [] };
  }

  // ================ Find a property by id ================
  async findOne(id: string) {
    const property = await this.PropertyModel.findById(id).exec();

    if (!property) throw new NotFoundException('Property not found');

    const user = await this.userModel.findById(property.ownerId).exec();
    const updatedUser = updateResponse({ user });

    const data = {
      property: property.toObject(),
      user: updatedUser.updatedUser,
    };

    return { data: data };
  }

  // ================ Update a property ================
  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
    userId: string,
  ) {
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
  }

  // ================ Delete a property ================
  async remove(id: string, userId: string) {
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
  }
}
