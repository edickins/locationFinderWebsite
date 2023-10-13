import { Registry } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export interface Facility {
  full_name: string;
  short_name: string;
  id: string;
}

// required when creating a temporary Object to store the facilities.
// this interface has all the props of Facility + all the props of a miragejs model
export interface FacilityModel extends Facility {
  attrs: any;
  modelName: string;
  save(): void;
  update<K extends never>(key: K, value: any): void;
  update(changes: Partial<any>): void;
  destroy(): void;
  reload(): void;
}

export interface Toilet {
  id: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  long_name: string;
  alphabetical_name: string;
  open_status: string;
  location: string;
  geometry: {
    location: { lat: number; lng: number };
    location_type: string;
    viewport: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
    bounds: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
  };
  place_id: string;
  formatted_address: string;
  opening_hours: string[];
  nearest_alternative: number;
  facilities: string[];
  date_created: string;
  date_modified: string;
  isFavourite: boolean;
}

// define the Models used in the AppRegistry
export type Models = {
  toilet: ModelDefinition<Toilet>;
  facility: ModelDefinition<Facility>;
};

// add the Models to the AppRegistry
export type AppRegistry = Registry<
  Models,
  { toilet: ModelDefinition<Toilet>; facility: ModelDefinition<Facility> }
>;

// export AppSchema so that 'schema' can be typed on enpoints in the server
export type AppSchema = Schema<AppRegistry>;
