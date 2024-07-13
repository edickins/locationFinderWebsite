export interface IFacility {
  full_name: string;
  short_name: string;
  id: string;
}

export interface IFacilitiesContext {
  facilities: IFacility[];
}
