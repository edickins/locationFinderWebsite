import { ILocation } from '../../../../context/locationContext/types';

const mockLocations: ILocation[] = [
  {
    id: '1',
    long_name: 'Location 1',
    alphabetical_name: 'Location One',
    open_status: 'Open',
    location: 'Some location',
    address_components: [],
    formatted_address: 'Formatted address',
    geometry: {
      location: { lat: 0, lng: 0 },
      location_type: 'Point',
      viewport: {
        northeast: { lat: 1, lng: 1 },
        southwest: { lat: -1, lng: -1 }
      }
    },
    place_id: 'place-1',
    opening_hours: [],
    nearest_alternative: 'Alternative location',
    facilities: [],
    date_created: undefined,
    date_modified: undefined,
    isFavourite: false
  },
  {
    id: '2',
    long_name: 'Location 2',
    alphabetical_name: 'Location Two',
    open_status: 'Closed',
    location: 'Another location',
    address_components: [],
    formatted_address: 'Formatted address 2',
    geometry: {
      location: { lat: 10, lng: 20 },
      location_type: 'Point',
      viewport: {
        northeast: { lat: 11, lng: 21 },
        southwest: { lat: 9, lng: 19 }
      }
    },
    place_id: 'place-2',
    opening_hours: [],
    nearest_alternative: 'Alternative location 2',
    facilities: [],
    date_created: undefined,
    date_modified: undefined,
    isFavourite: true
  },
  {
    id: '3',
    long_name: 'Location 3',
    alphabetical_name: 'Location Three',
    open_status: 'Unknown',
    location: 'Yet another location',
    address_components: [],
    formatted_address: 'Formatted address 3',
    geometry: {
      location: { lat: 30, lng: 40 },
      location_type: 'Point',
      viewport: {
        northeast: { lat: 31, lng: 41 },
        southwest: { lat: 29, lng: 39 }
      }
    },
    place_id: 'place-3',
    opening_hours: [],
    nearest_alternative: 'Alternative location 3',
    facilities: [],
    date_created: undefined,
    date_modified: undefined,
    isFavourite: false
  }
];

export default mockLocations;
