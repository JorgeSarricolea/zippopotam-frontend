import { ZipCode } from "../../domain/entities/ZipCode";
import { ZipCodeService } from "../services/ZipCodeService";

export class GetZipCodeInfoUseCase {
  constructor(private readonly zipCodeService: ZipCodeService) {}

  async execute(countryCode: string, zipCode: string): Promise<ZipCode> {
    return await this.zipCodeService.getZipCodeInfo(countryCode, zipCode);
  }
}
