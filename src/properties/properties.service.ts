import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/entity/register.entity';
import { FilterQueryT } from 'src/types/types/filter-query';
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

  // ================ Find a property by id ================
  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  // ================ Update a property ================
  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  // ================ Remove a property ================
  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
