import { Place } from "./Place";

export class ZipCode {
  constructor(
    public postCode: string,
    public country: string,
    public countryAbbreviation: string,
    public places: Place[]
  ) {}
}
