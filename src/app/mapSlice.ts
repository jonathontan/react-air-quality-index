import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import constants from "../constants";
import { FetchStatus } from "../enum/enums";
import { AirPollution, Geocoding, CurrentWeather } from "../interfaces/map";
import mapService from "../services/mapService";

interface MapSliceState {
  center: [number, number]
  zoom: number,
  marker: [number, number] | undefined
  geocoding: Geocoding[] | undefined
  airPollution: AirPollution | undefined
  currentWeather: CurrentWeather | undefined
  fetchStatus: FetchStatus
}

const MapInitialState: MapSliceState = {
  center: [constants.coordinateX, constants.coordinateY],
  zoom: constants.zoom,
  marker: undefined,
  geocoding: undefined,
  airPollution: undefined,
  currentWeather: undefined,
  fetchStatus: FetchStatus.IDLE
}

const mapSlice = createSlice({
  name: "map",
  initialState: MapInitialState,
  reducers: {
    setCenter: (state, action) => {
      state.center = action.payload
    },
    setZoom: (state, action) => {
      state.zoom = action.payload
    },
    setMarker: (state, action) => {
      state.marker = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGeocoding.pending, (state) => {
        state.fetchStatus = FetchStatus.LOADING
      })
      .addCase(fetchGeocoding.fulfilled, (state, action) => {
        state.fetchStatus = FetchStatus.COMPLETED
        state.geocoding = action.payload
      })
      .addCase(fetchGeocoding.rejected, (state) => {
        state.fetchStatus = FetchStatus.FAILED
      })
      .addCase(fetchAirPollution.pending, (state) => {
        state.fetchStatus = FetchStatus.LOADING
      })
      .addCase(fetchAirPollution.fulfilled, (state, action) => {
        state.fetchStatus = FetchStatus.COMPLETED
        state.airPollution = action.payload
      })
      .addCase(fetchAirPollution.rejected, (state) => {
        state.fetchStatus = FetchStatus.FAILED
      })
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.fetchStatus = FetchStatus.LOADING
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.fetchStatus = FetchStatus.COMPLETED
        state.currentWeather = action.payload
      })
      .addCase(fetchCurrentWeather.rejected, (state) => {
        state.fetchStatus = FetchStatus.FAILED
      })
  },
})

export const fetchGeocoding = createAsyncThunk(
  "map/fetchGeocoding",
  async (query: string) => {
    try {
      const response = await mapService.getGeocoding(query)
      const responseData = await response.json()

      return responseData

    } catch (e: unknown) {
      if (e instanceof Error)
        throw new Error(e.message)
    }
  }
)

export const fetchAirPollution = createAsyncThunk(
  "map/fetchAirPollution",
  async (coordinates: [number, number]) => {
    try {
      const response = await mapService.getAirPollution(coordinates)
      const responseData = await response.json()

      return responseData
    } catch (e: unknown) {
      if (e instanceof Error)
        throw new Error(e.message)
    }
  }
)

export const fetchCurrentWeather = createAsyncThunk(
  "map/fetchCurrentWeather",
  async (coordinates: [number, number]) => {
    try {
      const response = await mapService.getCurrentWeather(coordinates)
      const responseData = await response.json()

      return responseData
    } catch (e: unknown) {
      if (e instanceof Error)
        throw new Error(e.message)
    }
  }
)

export const fetchIp = createAsyncThunk(
  "map/fetchIp",
  async () => {
    try {
      const response = await mapService.getIp()
      const responseData = await response.text()

      return responseData
    } catch (e: unknown) {
      if (e instanceof Error)
        throw new Error(e.message)
    }
  }
)

export const fetchIpDetails = createAsyncThunk(
  "map/fetchIpDetails",
  async (ip: string) => {
    try {
      const response = await mapService.getIpDetails(ip)
      const responseData = await response.json()

      return responseData
    } catch (e: unknown) {
      if (e instanceof Error)
        throw new Error(e.message)
    }
  }
)

export const mapReducer = mapSlice.reducer
export const mapActions = mapSlice.actions