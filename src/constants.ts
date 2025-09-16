import { AirQualityBreakpoint, AqiCategory as AqiCategoryType } from "./interfaces/map"

const mobileBreakpoint: number = 576
const tabletBreakpoint: number = 1024
const zoom = 3
const coordinateX = -6
const coordinateY = 114

const pm25Breakpoints: AirQualityBreakpoint[] = [
  { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50 },
  { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
  { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
  { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
  { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
  { cLow: 250.5, cHigh: 350.4, iLow: 301, iHigh: 400 },
  { cLow: 350.5, cHigh: 500.4, iLow: 401, iHigh: 500 },
]

const pm10Breakpoints: AirQualityBreakpoint[] = [
  { cLow: 0, cHigh: 54, iLow: 0, iHigh: 50 },
  { cLow: 55, cHigh: 154, iLow: 51, iHigh: 100 },
  { cLow: 155, cHigh: 254, iLow: 101, iHigh: 150 },
  { cLow: 255, cHigh: 354, iLow: 151, iHigh: 200 },
  { cLow: 355, cHigh: 424, iLow: 201, iHigh: 300 },
  { cLow: 425, cHigh: 504, iLow: 301, iHigh: 400 },
  { cLow: 505, cHigh: 604, iLow: 401, iHigh: 500 },
]

const AqiCategory: AqiCategoryType[] = [
  { min: 0, max: 50, label: "Good", color: "green" },
  { min: 51, max: 100, label: "Moderate", color: "orange" },
  { min: 101, max: 150, label: "Unhealthy for sensitive groups", color: "orange" },
  { min: 151, max: 200, label: "Unhealthy", color: "red" },
  { min: 201, max: 300, label: "Very Unhealthy", color: "purple" },
  { min: 301, max: 500, label: "Hazardous", color: "maroon" },
  { min: 501, max: 1000, label: "Very Hazardous", color: "brown" },
];


export default { 
  mobileBreakpoint, 
  tabletBreakpoint,
  zoom,
  coordinateX,
  coordinateY,
  pm25Breakpoints,
  pm10Breakpoints,
  AqiCategory
}