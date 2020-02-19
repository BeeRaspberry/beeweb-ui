export interface ICountry {
  id: string;
  name: string;
  shortName: string;
}

export interface IProvince {
  id: string;
  name: string;
  abbreviation: string;
  country: ICountry;
}

export interface ILocation {
  id: string;
  city: string;
  streetAddress: string;
  stateProvince: IProvince;
  postalCode: string;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  location: ILocation;
  phoneNumber: string;
  active: boolean;
}

export interface IProvinceQuery {
  edges: IProvince[];
}

export interface ILocationQuery {
  edges: ILocation[];
}

export interface IUserQuery {
  edges: IUser[];
}
