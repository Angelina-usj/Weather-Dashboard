# Weather Dashboard (React + Vite)

Search for a city and see its current weather. Data comes from the free
[Open-Meteo](https://open-meteo.com/) API (no API key needed).

## Install and run

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually http://localhost:5173).

## Components

| File | Role |
| --- | --- |
| `App.jsx` | Owns `city`, `weather`, `status`; fetches data in `useEffect` |
| `SearchBar.jsx` | Controlled input with validation (empty search shows an error) |
| `WeatherCard.jsx` | Shows the weather data |
| `LoadingSpinner.jsx` | Loading state |
| `ErrorMessage.jsx` | Error state |

## State and props

- `App` holds `city`, `weather` and `status` (`useState`). The `useEffect` runs
  on mount and again whenever `city` changes (dependency array `[city]`).
- Props: `App → SearchBar (onSearch)`, `App → WeatherCard (weather)`,
  `App → ErrorMessage (city)`.
- No state is drilled more than one level, so no extra justification is needed.
  `SearchBar` keeps its own input and error state because nothing else needs them.
