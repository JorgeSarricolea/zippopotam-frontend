import React from "react";
import "../../styles/SearchHistory.css";

interface SearchHistoryProps {
  history: Array<{ zipCode: string; state: string; city: string }>;
  clearHistory: () => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  clearHistory,
}) => {
  return (
    <div className="search-history-container">
      <h3>Search History</h3>
      {history.length > 0 ? (
        <ul className="search-history-list">
          {history.map((item) => (
            <li key={item.zipCode} className="search-history-item">
              <span className="history-zip">Zip Code: {item.zipCode}</span>
              <span className="history-city">City: {item.city}</span>
              <span className="history-state">State: {item.state}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search history available.</p>
      )}
      <button className="search-history-button" onClick={clearHistory}>
        Clear History
      </button>
    </div>
  );
};

export default SearchHistory;
