const baseUrl = "http://api.openweathermap.org"
const openWeatherMapApiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

function getGeocoding(query: string) {
  const relativeUrl =
    `/geo/1.0/direct?q=${query}&appid=${openWeatherMapApiKey}`
  const requestUrl = baseUrl + relativeUrl

  return fetch(requestUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
}

function getAirPollution(coordinates: [number, number]) {
  const relativeUrl =
    `/data/2.5/air_pollution?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${openWeatherMapApiKey}`
  const requestUrl = baseUrl + relativeUrl

  return fetch(requestUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
}

export default {
  getGeocoding,
  getAirPollution
}