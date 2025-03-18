import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoggedInUser } from 'src/decorators/loggedInuser.decorator';
import { AuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { AuthorizationHeader } from 'src/types/enum/common.type';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesService } from './properties.service';
import { FilterDto } from './dto/filter.dto';

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

  // ============================ GET PROPERTY BY ID ============================
  @ApiOperation({ summary: 'Get Property By Id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  // ============================ UPDATE PROPERTY ============================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Update Property' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  // ============================ DELETE PROPERTY ============================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Delete Property' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
