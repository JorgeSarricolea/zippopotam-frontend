import { ZipCode } from "../../domain/entities/ZipCode.ts";
import { Place } from "../../domain/entities/Place.ts";

export class ZipCodeFactory {
  static createFromApiResponse(response: any): ZipCode {
    const places = response.places.map((place: any) => {
      return new Place(
        place["place_name"],
        place.longitude,
        place.latitude,
        place.state,
        place["state_abbreviation"]
      );
    });

    return new ZipCode(
      response["post_code"],
      response.country,
      response["country_abbreviation"],
      places
    );
  }
}
