import { Icon } from "@iconify/react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import L from "leaflet";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useAppSelector } from "../app/hooks";
import constants from "../constants";
import { AirQualityBreakpoint } from "../interfaces/map";
import colors from "../styles/colors";
import styles from "./Map.module.css";

const openWeatherMapApiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

function UpdateMap() {
  const map = useMap()
  const zoom = useAppSelector(state => state.map.zoom)
  const newCoordinates = useAppSelector(state => state.map.center)

  useEffect(() => {
    map.setView([newCoordinates[0] + 0.06, newCoordinates[1]], 12)
  }, [newCoordinates, map])

  useEffect(() => {
    map.setZoom(zoom)
  }, [zoom, map])

  return null
}

function Map() {
  const marker = useAppSelector(state => state.map.marker)
  const markerRef = useRef<L.Marker>(null)
  const geocoding = useAppSelector(state => state.map.geocoding)
  const airPollution = useAppSelector(state => state.map.airPollution)
  const currentWeather = useAppSelector(state => state.map.currentWeather)
  const [expanded, setExpanded] = useState<string | false>("")

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
    const category = constants.aqiCategory.find(c => aqi >= c.min && aqi <= c.max)
    return { label: category?.label, color: category?.color }
  }

  const handleExpandedChange = (panel: string) => (_event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  const popupContent = () => {
    const data = airPollution?.list[0]
    const weather = currentWeather?.weather[0]
    const temperature = currentWeather?.main
    const values = data?.components
    const pm25 = values?.pm2_5
    const pm10 = values?.pm10
    const aqiPm25 = calculateAqi(pm25, constants.pm25Breakpoints)
    const aqipm10 = calculateAqi(pm10, constants.pm10Breakpoints)
    const city = geocoding ? geocoding[0].name : ""

    const overallAqi = Math.max(aqiPm25, aqipm10)
    const category = aqiCategory(overallAqi)

    return (
      <div className={styles.popupContent}>
        <h2>{city}</h2>
        <div className={styles.accordion}>
          <Accordion
            defaultExpanded
            expanded={expanded === "aqi"}
            onChange={handleExpandedChange("aqi")}
            sx={{
              border: "1px solid",
              borderColor: colors.grey,
              borderRadius: "5px",
              "& .MuiAccordionSummary-root": {
                padding: "0 10px",
              },
              "& .MuiAccordionDetails-root": {
                padding: "0rem 2rem 1rem 2rem",
              },
            }}>
            <AccordionSummary
              expandIcon={<Icon height={"1.5rem"} icon={"mdi:expand-more"} />}
              sx={{
                ".MuiAccordionSummary-content": {
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: 0,
                  "&.Mui-expanded": {
                    margin: 0,
                  }
                },
                "&.Mui-expanded": {
                  minHeight: 50
                }
              }}
            >
              <Typography variant="h6">Air Quality Index: {overallAqi}</Typography>
              <Typography variant="h6" fontWeight={'bold'} color={category.color}>{category.label}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
              padding: '0 2rem 0 1rem !important'
            }}>
              <dl className={styles.detailsList}>
                {values && Object.entries(values).map(([k, v], index) => {
                  const label = constants.aqiLabels[k]
                  return (
                    <div key={index} className={styles.detailItem}>
                      <dt className={styles.title}>{label.name ?? k}</dt>
                      <dd className={styles.description}>{v} {label.unit ?? ""}</dd>
                    </div>
                  )
                })}

              </dl>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "weather"}
            onChange={handleExpandedChange("weather")}
            sx={{
              border: "1px solid",
              borderColor: colors.grey,
              borderRadius: "5px",
              "& .MuiAccordionSummary-root": {
                padding: "0 10px",
              },
              "& .MuiAccordionDetails-root": {
                padding: "0rem 2rem 1rem 2rem",
              },
            }}>
            <AccordionSummary
              expandIcon={<Icon height={"1.5rem"} icon={"mdi:expand-more"} />}
              sx={{
                ".MuiAccordionSummary-content": {
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: 0,
                  "&.Mui-expanded": {
                    margin: 0,
                  }
                },
                "&.Mui-expanded": {
                  minHeight: 50
                }
              }}
            >
              <Typography variant="h6">Current Weather: {temperature?.temp.toFixed()} °C</Typography>
              <img
                src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
                loading="lazy"
                className={styles.weather}
              />
            </AccordionSummary>
            <AccordionDetails sx={{
              padding: '0 2rem 0 1rem !important'
            }}>
              <Typography margin="0 !important">
                {weather?.description
                  ? weather.description
                    .split(" ")
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")
                  : ""
                }
              </Typography>
              <dl className={styles.detailsList}>
                {temperature && Object.entries(temperature).map(([k, v], index) => {
                  const label = constants.weatherLabels[k]
                  return (
                    <div key={index} className={styles.detailItem}>
                      <dt className={styles.title}>{label.name ?? ""}</dt>
                      <dd className={styles.description}>{v} {label.unit ?? ""}</dd>
                    </div>
                  )
                })}
              </dl>
            </AccordionDetails>
          </Accordion>
        </div>
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
            <Popup
              minWidth={350}
              maxWidth={350}
            >{popupContent()}</Popup>
          )}
        </Marker>
      )}
      <UpdateMap />
    </MapContainer>
  )
}

export default Map;