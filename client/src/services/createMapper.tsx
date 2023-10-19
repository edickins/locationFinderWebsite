import { IToilet } from '../context/toiletContext/types';

function createMapper(properties: (keyof IToilet)[]) {
  return function mapToiletProps(toilets: IToilet[]) {
    return toilets.map((toilet) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return properties.reduce((obj: any, prop: keyof IToilet) => {
        if (prop in toilet) {
          // eslint-disable-next-line no-param-reassign
          obj[prop] = (toilet as IToilet)[prop];
        }
        return obj;
      }, {} as IToilet);
    });
  };
}
export default createMapper;
