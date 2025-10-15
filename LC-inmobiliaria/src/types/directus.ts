export interface DirectusProperty {
  id: number;
  Title: string;
  Slug?: string;
  Address: string;
  City: string;
  State: string;
  Country: string;
  Price: string | number;
  Currency: string[];
  Bedrooms: number;
  Bathrooms: number;
  Parking_spaces?: number;
  Featured: boolean;
  Operation_type: string[]; // ["venta"] | ["renta"]
  Property_type: string[]; // ["casa"] | ["departamento"] | etc.
  Image?: any;
  Amenidades?: string[];
  Descripcion?: string;
}

export interface DirectusPropertyResponse {
  data: DirectusProperty[];
  meta?: {
    total_count: number;
    filter_count: number;
  };
}