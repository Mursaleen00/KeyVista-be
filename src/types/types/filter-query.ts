import { FilterQuery } from 'mongoose';
import { PropertyKind } from 'src/types/enum/property-kind';
import { PropertyPurpose } from 'src/types/enum/property-purpose';
import { Property } from 'src/properties/entities/property.entity';

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
