export interface ILocation {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
}

export const defaultValue: Readonly<ILocation> = {};
