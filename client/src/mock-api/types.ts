/* eslint-disable @typescript-eslint/no-explicit-any */
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

// define the Models used in the AppRegistry
export type Models = {
  toilet: ModelDefinition;
  facility: ModelDefinition<Facility>;
};

// add the Models to the AppRegistry
export type AppRegistry = Registry<
  Models,
  { toilet: ModelDefinition; facility: ModelDefinition<Facility> }
>;

// export AppSchema so that 'schema' can be typed on enpoints in the server
export type AppSchema = Schema<AppRegistry>;
