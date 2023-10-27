import { ToiletActionType } from '../../reducer/toiletReducer/types';

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

export interface IFacility {
  full_name: string;
  short_name: string;
  id: string;
}

interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface IToilet {
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

export interface IToiletsContext {
  state: IInitialToiletsState;
  dispatchToilets: React.Dispatch<ToiletActionType>;
  facilities: IFacility[];
}

export interface IInitialToiletsState {
  toilets: IToilet[];
  error: string | Error | undefined;
}
