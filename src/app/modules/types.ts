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
