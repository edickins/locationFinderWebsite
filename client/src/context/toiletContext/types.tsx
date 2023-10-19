import GeoJSON from 'geojson';
import { ToiletActionType } from '../../reducer/toiletReducer/types';

export interface IGeometry {
  location: {
    type: GeoJSON.Point['type'];
    coordinates: GeoJSON.Point['coordinates'];
    viewport: IViewport;
  };
}

interface IViewport {
  northeast: { lat: number; lng: number };
  southwest: { lat: number; lng: number };
}

export interface IFacility {
  full_name: string;
  short_name: string;
  id: string;
}

export interface IAddressComponent {
  long_name: string;
  alphabetical_name: string;
  types: string[];
}

export interface IToilet {
  id: string;
  long_name: string;
  alphabetical_name: string;
  open_status: string;
  location: string;
  address_components: IAddressComponent;
  formatted_address: string;
  geometry: IGeometry;
  placeid: string;
  opening_hours: string[];
  nearest_alternative: string;
  facilities: IFacility[];
  facilityList: IFacility[];
  date_created: Date | undefined;
  date_modified: Date | undefined;
  isFavourite: boolean;
}

export interface IToiletsContext {
  state: IInitialToiletsState;
  dispatchToilets: React.Dispatch<ToiletActionType>;
}

export interface IInitialToiletsState {
  toilets: IToilet[];
  error: string | Error | undefined;
}
