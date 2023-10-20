import { describe, expect, it } from 'vitest';
import createMapper from './createMapper';
import { IToilet } from '../context/toiletContext/types';

const toilets: IToilet[] = [
  {
    id: 'toilet001',
    long_name: 'Bartholomew House',
    alphabetical_name: 'Bartholomew House',
    location: 'city_centre',
    open_status: 'open',
    isFavourite: false,
    nearest_alternative: 'toilet012',
    opening_hours: [
      'The customer service centre is open from 9am to 4:30pm from Monday to Friday (excluding Bank Holidays).'
    ],
    address_components: [
      {
        long_name: 'Bartholomew Square',
        short_name: 'Bartholomew Square',
        types: ['premise']
      },
      {
        long_name: 'Brighton and Hove',
        short_name: 'Brighton and Hove',
        types: ['locality', 'political']
      },
      {
        long_name: 'Brighton',
        short_name: 'Brighton',
        types: ['postal_town']
      },
      {
        long_name: 'Brighton and Hove',
        short_name: 'Brighton and Hove',
        types: ['administrative_area_level_2', 'political']
      },
      {
        long_name: 'England',
        short_name: 'England',
        types: ['administrative_area_level_1', 'political']
      },
      {
        long_name: 'United Kingdom',
        short_name: 'GB',
        types: ['country', 'political']
      },
      {
        long_name: 'BN1 1JS',
        short_name: 'BN1 1JS',
        types: ['postal_code']
      }
    ],
    formatted_address: 'Bartholomew Square, Brighton, BN1 1JP.',
    geometry: {
      location: {
        lat: 50.8202411,
        lng: -0.1409286
      },
      location_type: 'ROOFTOP',
      viewport: {
        northeast: {
          lat: 50.8214611302915,
          lng: -0.139192569708498
        },
        southwest: {
          lat: 50.8187631697085,
          lng: -0.141890530291502
        }
      }
    },
    place_id: 'ChIJAUFwtQuFdUgR-3dMcDF1Ijc',
    date_created: '2023-10-10T14:48:00.000Z',
    date_modified: '2023-10-10T14:48:00.000Z',
    facilities: [
      {
        full_name: 'toilets',
        short_name: 'toilets',
        id: 'facility001'
      },
      {
        full_name: 'accessible toilets',
        short_name: 'accessible',
        id: 'facility002'
      }
    ]
  },
  {
    id: 'toilet002',
    long_name: 'Black Rock',
    alphabetical_name: 'Black Rock',
    location: 'city_centre',
    open_status: 'open',
    isFavourite: false,
    nearest_alternative: 'toilet015',
    opening_hours: ['Not listed.'],
    address_components: [
      {
        long_name: 'Madeira Drive',
        short_name: 'Madeira Dr',
        types: ['route']
      },
      {
        long_name: 'Brighton',
        short_name: 'Brighton',
        types: ['postal_town']
      },
      {
        long_name: 'Brighton and Hove',
        short_name: 'Brighton and Hove',
        types: ['administrative_area_level_2', 'political']
      },
      {
        long_name: 'England',
        short_name: 'England',
        types: ['administrative_area_level_1', 'political']
      },
      {
        long_name: 'United Kingdom',
        short_name: 'GB',
        types: ['country', 'political']
      },
      {
        long_name: 'BN2 1EN',
        short_name: 'BN2 1EN',
        types: ['postal_code']
      }
    ],
    formatted_address: 'Madeira Drive, Brighton, BN2 1EN.',
    geometry: {
      bounds: {
        northeast: {
          lat: 50.81940990000002,
          lng: -0.1125193
        },
        southwest: {
          lat: 50.81495409999997,
          lng: -0.1359435
        }
      },
      location: {
        lat: 50.8173319,
        lng: -0.1234411
      },
      location_type: 'GEOMETRIC_CENTER',
      viewport: {
        northeast: {
          lat: 50.81940990000002,
          lng: -0.1125193
        },
        southwest: {
          lat: 50.81495409999997,
          lng: -0.1359435000000001
        }
      }
    },
    place_id:
      'EiBNYWRlaXJhIERyLCBCcmlnaHRvbiBCTjIgMUVOLCBVSyIuKiwKFAoSCefm5VK6hXVIEUjgFoHGIUX-EhQKEglfjVgWpIV1SBGM9JBWx4aH9w',
    date_created: '2023-10-10T14:48:00.000Z',
    date_modified: '2023-10-10T14:48:00.000Z',
    facilities: [
      {
        full_name: 'toilets',
        short_name: 'toilets',
        id: 'facility001'
      },
      {
        full_name: 'accessible toilets',
        short_name: 'accessible',
        id: 'facility002'
      }
    ]
  },
  {
    id: 'toilet003',
    long_name: 'Blakers Park',
    alphabetical_name: 'Blakers Park',
    location: 'city_centre',
    open_status: 'open',
    isFavourite: false,
    nearest_alternative: 'toilet018',
    opening_hours: ['Not listed.'],
    address_components: [
      {
        long_name: 'Cleveland Road',
        short_name: 'Cleveland Rd',
        types: ['route']
      },
      {
        long_name: 'Brighton and Hove',
        short_name: 'Brighton and Hove',
        types: ['locality', 'political']
      },
      {
        long_name: 'Brighton',
        short_name: 'Brighton',
        types: ['postal_town']
      },
      {
        long_name: 'Brighton and Hove',
        short_name: 'Brighton and Hove',
        types: ['administrative_area_level_2', 'political']
      },
      {
        long_name: 'England',
        short_name: 'England',
        types: ['administrative_area_level_1', 'political']
      },
      {
        long_name: 'United Kingdom',
        short_name: 'GB',
        types: ['country', 'political']
      },
      {
        long_name: 'BN1 6FF',
        short_name: 'BN1 6FF',
        types: ['postal_code']
      }
    ],
    formatted_address: 'Cleveland Rd, Brighton and Hove, Brighton BN1 6FF, UK',
    geometry: {
      bounds: {
        northeast: {
          lat: 50.84241830000003,
          lng: -0.1374677
        },
        southwest: {
          lat: 50.84089439999997,
          lng: -0.1384098
        }
      },
      location: {
        lat: 50.8424183,
        lng: -0.1384098
      },
      location_type: 'GEOMETRIC_CENTER',
      viewport: {
        northeast: {
          lat: 50.8430053302915,
          lng: -0.136589769708498
        },
        southwest: {
          lat: 50.8403073697085,
          lng: -0.139287730291502
        }
      }
    },
    place_id:
      'EjVDbGV2ZWxhbmQgUmQsIEJyaWdodG9uIGFuZCBIb3ZlLCBCcmlnaHRvbiBCTjEgNkZGLCBVSyIuKiwKFAoSCfsbeHB_hXVIEbxyFciGf0YeEhQKEgnHJ_5cf4V1SBG5C-Yk8WgI4w',
    date_created: '2023-10-10T14:48:00.000Z',
    date_modified: '2023-10-10T14:48:00.000Z',
    facilities: [
      {
        full_name: 'toilets',
        short_name: 'toilets',
        id: 'facility001'
      },
      {
        full_name: 'accessible toilets',
        short_name: 'accessible',
        id: 'facility002'
      },
      {
        full_name: 'baby changing facilities',
        short_name: 'baby',
        id: 'facility003'
      }
    ]
  }
];

describe('createMapper function', () => {
  it('returns an Array of items with exactly the correct number of properties.', () => {
    const properties: (keyof IToilet)[] = ['id', 'long_name', 'location'];
    const threePropMapper = createMapper(properties);

    toilets.forEach((item) => {
      const keys = Object.keys(item);
      expect(keys).toHaveLength(15);
    });

    const results = threePropMapper(toilets);
    results.forEach((item) => {
      const keys = Object.keys(item);
      expect(keys).toHaveLength(3);
    });
  });

  it('handles an empty array', () => {
    const properties: (keyof IToilet)[] = ['id', 'long_name', 'location'];
    const threePropMapper = createMapper(properties);

    const results = threePropMapper([]);
    expect(results).toEqual([]);
  });

  it('handles an incorrect array of properties to filter on', () => {
    const properties: (keyof IToilet)[] = [
      'id',
      'long_name',
      'location',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'ufo_status' as any
    ];
    const threePropMapper = createMapper(properties);

    const results = threePropMapper([]);
    results.forEach((item) => {
      const keys = Object.keys(item);
      expect(keys).toHaveLength(3);
    });
  });
});
