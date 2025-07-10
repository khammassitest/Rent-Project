export interface Property {
  id: string;
  description: string;
  address: string;
  status: number;
  userId: string;

  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSize?: number;
  yearBuilt?: number;
  propertyType?: string;
  floor?: number;
  totalFloors?: number;
  hasGarage?: boolean;
  garageSpaces?: number;
  hasBasement?: boolean;
  hasPool?: boolean;
  hasElevator?: boolean;
  furnished?: boolean;
  condition?: string;
  heatingType?: string;
  coolingType?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  listingDate?: string; // ISO string
  estimatedPrice?: number;
  photos?: any[];
  user?: any;
  visits?: any[];
  favorites?: any[];
}
