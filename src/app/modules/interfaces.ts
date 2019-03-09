export interface ICountry {
  name: string;
  shortName: string;
}

export interface IProvince {
  name: string;
  abbreviation: string;
  country: ICountry;
}

export interface ILocation {
  city: string;
  streetAddress: string;
  stateProvince: IProvince;
  postalCode: string;
}
