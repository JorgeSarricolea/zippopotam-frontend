import axios from "../../infrastructure/config/apiConfig";
import { ZipCodeFactory } from "../../adapters/factories/ZipCodeFactory";
import { ZipCode } from "../../domain/entities/ZipCode";

export class ZipCodeService {
  async getZipCodeInfo(countryCode: string, zipCode: string): Promise<ZipCode> {
    const response = await axios.get(`/zipcodes/${countryCode}/${zipCode}`);

    if (response.data?.places) {
      return ZipCodeFactory.createFromApiResponse(response.data);
    } else {
      throw new Error("Invalid API response");
    }
  }
}
