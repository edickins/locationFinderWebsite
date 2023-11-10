import { ILocation } from '../context/locationContext/types';

function createMapper(properties: (keyof ILocation)[]) {
  return function mapToiletProps(toilets: ILocation[]) {
    return toilets.map((toilet) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return properties.reduce((obj: any, prop: keyof ILocation) => {
        if (prop in toilet) {
          // eslint-disable-next-line no-param-reassign
          obj[prop] = (toilet as ILocation)[prop];
        }
        return obj;
      }, {} as ILocation);
    });
  };
}
export default createMapper;
