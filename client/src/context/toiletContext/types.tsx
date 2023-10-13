import GeoJSON from 'geojson';
import { ToiletActionTypes } from '../../reducer/toiletReducer/types';

interface IGeometry {
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
  fullName: string;
  shortName: string;
  id: string;
}

interface IAddressComponent {
  longName: string;
  alphabeticalName: string;
  types: string[];
}

export interface IToilet {
  id: string;
  longName: string;
  alphabeticalName: string;
  openStatus: string;
  location: string;
  addressComponents: IAddressComponent;
  formattedAddress: string;
  geometry: IGeometry;
  placeid: string;
  openingHours: string[];
  nearestAlternative: string;
  facilities: IFacility[];
  facilityList: IFacility[];
  dateCreated: Date;
  dateModified: Date;
  isFavourite: boolean;
}

export interface IToiletsContext {
  state: IInitialToiletsState;
  dispatchToilets: React.Dispatch<ToiletActionTypes>;
}

export interface IInitialToiletsState {
  toilets: IToilet[];
  error: any;
}
