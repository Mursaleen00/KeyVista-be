import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LoggedInUser } from 'src/decorators/loggedInuser.decorator';
import { AuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { AuthorizationHeader } from 'src/enum/authorization.enum';
import { PropertyPurpose } from 'src/enum/property-purpose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  // ============================ CREATE PROPERTY ============================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Create Property' })
  @Post()
  create(
    @Body() createPropertyDto: CreatePropertyDto,
    @LoggedInUser() id: string,
  ) {
    return this.propertiesService.create(createPropertyDto, id);
  }

  // ============================ GET ALL PROPERTY ============================
  @ApiOperation({ summary: 'Get All Properties' })
  @Get()
  findAll(@Query() filters: FilterDto) {
    return this.propertiesService.findAll(filters);
  }

  // ============================ GET MY PROPERTIES ============================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Get My Properties' })
  @Get('my-properties')
  myProperties(@LoggedInUser() id: string) {
    return this.propertiesService.findMyProperties(id);
  }

  // ============================ GET ALL MAP POINTS ============================
  @ApiQuery({
    name: 'type',
    enum: PropertyPurpose,
    default: PropertyPurpose.RENT,
  })
  @ApiOperation({ summary: 'Get All Maps Points' })
  @Get('map-points-with-properties/get')
  findAllWithMap(
    @Query('type', new ParseEnumPipe(PropertyPurpose)) type: PropertyPurpose,
  ) {
    return this.propertiesService.findMapPoints(type);
  }

  // ============================ GET PROPERTY BY ID ============================
  @ApiOperation({ summary: 'Get Property By Id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  // ============================ UPDATE PROPERTY ============================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Update Property' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @LoggedInUser() userId: string,
  ) {
    return this.propertiesService.update(id, updatePropertyDto, userId);
  }

  // ============================ DELETE PROPERTY ============================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Delete Property' })
  @Delete(':id')
  remove(@Param('id') id: string, @LoggedInUser() userId: string) {
    return this.propertiesService.remove(id, userId);
  }
}
