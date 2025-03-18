import { FilterQuery } from 'mongoose';
import { Property } from 'src/api/properties/entities/property.entity';
import { PropertyKind } from 'src/types/enum/property-kind';
import { PropertyPurpose } from 'src/types/enum/property-purpose';

interface City {
  $regex: string;
  $options: string;
}

interface Area {
  $regex?: string;
  $options?: string;
}

interface Price {
  $gte?: string;
  $lte?: string;
}

interface Size {
  $gte?: string;
  $lte?: string;
}

export type FilterQueryT = FilterQuery<Property> & {
  city?: City;
  area?: Area;
  kind?: PropertyKind;
  purpose?: PropertyPurpose;
  beds?: string;
  price?: Price;
  size?: Size;
};
