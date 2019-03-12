export interface TCountry {
  id: string;
  name: string;
  shortName: string;
}

export type TProvince = {
  id: string;
  name: string;
  abbreviation: string;
  country: TCountry;
};

export type TLocation = {
  id: string;
  city: string;
  streetAddress: string;
  stateProvince: TProvince;
  postalCode: string;
};

export type TProvinceQuery = {
  edges: TProvince[];
};

export type TLocationQuery = {
  allLocations: TLocation[];
};

export class Country {
  id: number;
  name: string;
  shortName: string;
  country: Country[];
}

export class Province {
  id: number;
  name: string;
  abbreviation: string;
  country: Country[];
}
