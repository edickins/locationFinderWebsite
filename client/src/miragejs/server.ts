import { createServer, hasMany, Model, RestSerializer } from 'miragejs';
import toiletSeedData from './data/seedToiletData.json';
import facilitySeedData from './data/seedFacilitiesData.json';
import { AppSchema, FacilityModel } from './types';

// custom serializer to prevent miragejs converting properties to camel case
const CustomSerializer = RestSerializer.extend({
  keyForAttribute(attr) {
    return attr;
  },
  include: ['facilities'],
  embed: true
});

export default function makeServer() {
  createServer({
    models: {
      toilet: Model.extend({
        facilities: hasMany()
      }),
      facility: Model.extend({
        toilets: hasMany()
      })
    },

    serializers: {
      toilet: CustomSerializer
    },

    seeds(server) {
      // seed all facilities and store them in a temp Array
      // so the Models can be used when the toilets are seeded
      const facilities: FacilityModel[] = [];
      facilitySeedData.forEach((facilityItem) => {
        const facility = server.create(
          'facility',
          facilityItem
        ) as FacilityModel;
        facilities.push(facility);
      });

      // seed the toilets referencing the temp Array of facilities
      toiletSeedData.forEach((toiletItem) => {
        // grab an Array of the facility Models<FacilityModel> to replace the strings in the JSON
        const toiletFacilities = toiletItem.facilities.map((id) =>
          facilities.find((item) => item.id === id)
        );

        // add the Array of toiletFacilities to overwrite the strings in the JSON
        const tempObj = { ...toiletItem, facilities: toiletFacilities };
        server.create('toilet', tempObj);
      });
    },

    routes() {
      this.get('/api/v1/toilets', (schema: AppSchema) => {
        return schema.all('toilet');
      });
    }
  });
}
