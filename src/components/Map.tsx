import { Typography } from "@mui/material";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useAppSelector } from "../app/hooks";
import constants from "../constants";
import { AirQualityBreakpoint } from "../interfaces/map";
import styles from "./Map.module.css";

const openWeatherMapApiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

function UpdateMap() {
  const map = useMap()
  const zoom = useAppSelector(state => state.map.zoom)
  const newCoordinates = useAppSelector(state => state.map.center)

  useEffect(() => {
    map.setView(newCoordinates, 12)
  }, [newCoordinates, map])

  useEffect(() => {
    map.setZoom(zoom)
  }, [zoom, map])

  return null
}

function Map() {
  const marker = useAppSelector(state => state.map.marker)
  const markerRef = useRef<L.Marker>(null)
  const airPollution = useAppSelector(state => state.map.airPollution)

  useEffect(() => {
    if (markerRef.current)
      setTimeout(() =>
        markerRef.current?.openPopup(), 1000)
  }, [marker])

  const calculateAqi = (concentration: number = 0, breakpoints: AirQualityBreakpoint[]) => {
    const bp = breakpoints.find(b => concentration >= b.cLow && concentration <= b.cHigh)
    if (!bp) return -1

    return Math.round(((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (concentration - bp.cLow) + bp.iLow)
  }

  const aqiCategory = (aqi: number) => {
    const category = constants.AqiCategory.find(c => aqi >= c.min && aqi <= c.max)
    return { label: category?.label, color: category?.color }
  }

  const popupContent = () => {
    const data = airPollution?.list[0]
    const values = data?.components
    const pm25 = values?.pm2_5
    const pm10 = values?.pm10
    const aqiPm25 = calculateAqi(pm25, constants.pm25Breakpoints)
    const aqipm10 = calculateAqi(pm10, constants.pm10Breakpoints)

    const overallAqi = Math.max(aqiPm25, aqipm10)
    const category = aqiCategory(overallAqi)

    return (
      <div className={styles.popupContent}>
        <header className={styles.header}>
          <Typography variant="h6">Air Quality Index: {overallAqi}</Typography>
          <Typography variant="h6" color={category.color}>{category.label}</Typography>
        </header>

        <section>
          <dl className={styles.detailsList}>
            {values && Object.entries(values).map(([k, v], index) => (
              <div key={index} className={styles.detailItem}>
                <dt className={styles.title}>{k.toUpperCase()}</dt>
                <dd className={styles.description}>{v}</dd>
              </div>
            ))}

          </dl>
        </section>
      </div>
    )
  }

  return (
    <MapContainer
      center={[constants.coordinateX, constants.coordinateY]}
      zoom={constants.zoom}
      scrollWheelZoom={true}
      className={styles.container}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${openWeatherMapApiKey}`}
        attribution="&copy; OpenWeatherMap"
      />
      {marker && (
        <Marker position={marker} ref={markerRef}>
          {airPollution && (
            <Popup>{popupContent()}</Popup>
          )}
        </Marker>
      )}
      <UpdateMap />
    </MapContainer>
  )
}

export default Map;