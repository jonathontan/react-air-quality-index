export interface Geocoding {
  name: string
  local_names: Record<string, string>
  lat: number
  lon: number
  country: string
  state?: string
}

export interface AirPollution {
  coord: {
    lon: number
    lat: number
  }
  list: {
    main: {
      aqi: number
    }
    components: Components
    dt: number
  }[]
}

export interface CurrentWeather {
  coord: {
    lon: number
    lat: number
  },
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  rain: {
    "1h": number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export interface AirQualityBreakpoint {
  cLow: number
  cHigh: number
  iLow: number
  iHigh: number
}

export interface Components {
  co: number
  no: number
  no2: number
  o3: number
  so2: number
  pm2_5: number
  pm10: number
  nh3: number
}

export interface AqiCategory {
  min: number;
  max: number;
  label: string;
  color: string;
}