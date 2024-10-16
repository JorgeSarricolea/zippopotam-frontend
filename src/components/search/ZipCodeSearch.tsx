import React, { useState } from "react";
import { GetZipCodeInfoUseCase } from "../../application/use-cases/GetZipCodeInfoUseCase";
import { ZipCodeService } from "../../application/services/ZipCodeService";
import { SearchHistoryService } from "../../application/services/SearchHistoryService";
import { countries } from "../../infrastructure/config/countriesConfig";
import { ZipCode } from "../../domain/entities/ZipCode";
import SearchHistory from "./SearchHistory";
import "../../styles/ZipCodeSearch.css"; // Asegúrate de tener los estilos importados

const ZipCodeSearch: React.FC = () => {
  const [countryCode, setCountryCode] = useState<string>("US");
  const [zipCode, setZipCode] = useState("");
  const [results, setResults] = useState<ZipCode | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<
    Array<{ zipCode: string; state: string; city: string }>
  >(SearchHistoryService.getHistory());

  const zipCodeService = new ZipCodeService();
  const getZipCodeInfoUseCase = new GetZipCodeInfoUseCase(zipCodeService);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!countryCode || !zipCode) {
      setError("Please enter valid details.");
      return;
    }

    try {
      const data = await getZipCodeInfoUseCase.execute(countryCode, zipCode);
      setResults(data);

      const newEntry = {
        zipCode,
        city: data.places[0].placeName,
        state: data.places[0].state,
      };
      const updatedHistory = [newEntry, ...history].slice(0, 5);

      setHistory(updatedHistory);
      SearchHistoryService.saveHistory(updatedHistory);

      setError("");
    } catch (error) {
      setError("Error fetching data.");
      setResults(null);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    SearchHistoryService.clearHistory();
  };

  return (
    <div className="zip-code-search-container">
      <h1>Global Zip Code Search</h1>
      <form onSubmit={handleSearch} className="zip-code-search-form">
        <label htmlFor="country-select">Country:</label>
        <select
          id="country-select"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          required
          className="zip-code-search-select"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>

        <label htmlFor="zip-code-input">Zip Code:</label>
        <input
          id="zip-code-input"
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
          className="zip-code-search-input"
        />

        <button type="submit" className="zip-code-search-button">
          Search
        </button>
      </form>

      {results?.places && (
        <div className="zip-code-search-results">
          <h3>Results</h3>
          <div className="zip-code-cards-container">
            {results.places.map((place) => (
              <div
                className="zip-code-card"
                key={place.placeName + place.state}
              >
                <h4>City: {place.placeName}</h4>
                <p>State: {place.state}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="zip-code-search-error">{error}</p>}

      <SearchHistory history={history} clearHistory={clearHistory} />
    </div>
  );
};

export default ZipCodeSearch;
