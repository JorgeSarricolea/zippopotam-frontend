### README for Frontend (Zip Code Search)

## Overview

This project is a **React** frontend application built with **Vite** and **TypeScript**. It communicates with a backend API to fetch information about zip codes and displays the results. The application also maintains a search history in **sessionStorage**, allowing the user to see their recent searches and clear the history if needed.

### Key Features:

- Search zip code information for different countries.
- Display city, state, and other details for the given zip code.
- Maintain a search history, showing the last five searches.
- Clear search history functionality.
- Responsive UI design.

## Requirements

- **Node.js** (v14 or higher)
- **npm** or **yarn**

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

```bash
src/
├── adapters/
│   └── factories/       # Contains factory classes for transforming data
├── application/
│   ├── services/        # Contains services for data fetching and session handling
│   └── use-cases/       # Contains use case logic for interacting with services
├── components/
│   └── search/          # React components related to zip code search
├── domain/
│   ├── entities/        # Domain entities for handling business logic
├── infrastructure/
│   └── config/          # API configuration and country data
└── styles/              # Global and component-specific styles
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Runs a local server to preview the production build.

## API Communication

The frontend communicates with the backend using Axios, and the backend API is expected to run at `http://localhost:8000/api/v1`.

### Example API Call

```typescript
import axios from "axios";

const response = await axios.get(`/zipcodes/us/90210`);
```

The API returns zip code data with details about the location, which is processed using the `ZipCodeFactory`.

## Components

### `ZipCodeSearch`

The main component allows the user to search for a zip code in a specified country. It displays the search results in cards and maintains a history of the last 5 searches.

### `SearchHistory`

Displays the search history with an option to clear the history.

### Example Component Usage

```typescript
import React from "react";
import ZipCodeSearch from "../components/search/ZipCodeSearch";
import "../styles/Globals.css";

const Home = () => {
  return (
    <div>
      <ZipCodeSearch />
    </div>
  );
};

export default Home;
```

## Search History

The search history is maintained using the `SearchHistoryService`, which stores and retrieves history from `sessionStorage`. This service is responsible for:

- Saving search history.
- Retrieving the saved history on component mount.
- Clearing the history when the user opts to do so.

### Example Usage of `SearchHistoryService`

```typescript
import { SearchHistoryService } from "../../application/services/SearchHistoryService";

// Save history
SearchHistoryService.saveHistory(history);

// Get history
const savedHistory = SearchHistoryService.getHistory();

// Clear history
SearchHistoryService.clearHistory();
```

## Styles

The project uses **CSS Modules** to keep styles scoped to individual components. Global styles (e.g., fonts) are defined in `Globals.css`.
