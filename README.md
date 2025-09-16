# Air Quality Index Project

A web application to display AQI (Air Quality Index) and weather information using OpenWeatherMap API and Leaflet.

It allows users to search for a city and displays its current AQI with clear indicators and pollutant info.

This project is deployed and accessible online at:  
[https://jonathon-aqi.onrender.com/](https://jonathon-aqi.onrender.com/)

## Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) v18+ installed
- npm (comes with Node.js)
- An OpenWeatherMap API key

## Local Installation

1. **Clone the repository**

```bash
git clone https://github.com/jonathontan/react-air-quality-index.git
cd your-repo
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a .env file in the root directory and add your OpenWeatherMap API key:

```bash
VITE_OPENWEATHER_API_KEY=API_KEY
```

4. **Run the project**

```bash
npm run dev
```

5. **Build the project**

```bash
npm run build
```
The build output will be in the dist/ folder.

## Assumptions
- The user has a valid OpenWeatherMap API key.
- All API requests use **HTTPS** to avoid mixed content errors.
- AQI data fetched is for the current day only; historical data is not included.
- The AQI calculation may not be fully accurate and is based on OpenWeatherMap’s data.
- The application is intended for modern browsers with JavaScript enabled.
- The default location search uses city names; no geocoding by postal code is implemented.
- Map and UI components assume standard desktop or mobile screen sizes.

## References & Documentations
- [OpenWeatherMap API](https://openweathermap.org/api) – Geocoding and Air Pollution API.
- [Leaflet](https://react-leaflet.js.org/docs/) – Interactive map
- [React](https://reactjs.org/) – Frontend library.
- [React Redux](https://react-redux.js.org/) – State management library for React.- [Material-UI](https://mui.com/material-ui) – UI component library for React.
- [notistack](https://iamhosseindhv.com/notistack) – Snackbar notifications for React.
- [Iconify](https://iconify.design/) – Icon library and framework.
- [Vite](https://vitejs.dev/) – Development and build tool.
- [Node.js](https://nodejs.org/) – JavaScript runtime.
- [npm](https://www.npmjs.com/) – Package manager.

## Additional Notes
- ChatGPT generated this README.
- Used ChatGPT to generate calculateAqi function in Map component line 39.