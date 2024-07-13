import { LocationActionType } from '../../reducer/locationReducer/types';
import { IFacility } from '../facilitiesContext/types';

interface IGeometry {
  bounds?: IViewport;
  location: {
    lat: number;
    lng: number;
  };
  location_type: string;
  viewport: IViewport;
}

interface IViewport {
  northeast: { lat: number; lng: number };
  southwest: { lat: number; lng: number };
}

interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface ILocation {
  id: string;
  long_name: string;
  alphabetical_name: string;
  open_status: string;
  location: string;
  address_components: IAddressComponent[];
  formatted_address: string;
  geometry: IGeometry;
  place_id: string;
  opening_hours: string[];
  nearest_alternative: string;
  facilities: IFacility[];
  date_created: string | undefined;
  date_modified: string | undefined;
  isFavourite: boolean;
}

export interface ILocationsContext {
  locationsState: IInitialLocationsState;
  dispatchLocations: React.Dispatch<LocationActionType>;
}

export interface IInitialLocationsState {
  locations: ILocation[];
  error: { message: string; messageTitle: string } | undefined;
}
