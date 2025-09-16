import { createSlice } from "@reduxjs/toolkit";
import constants from "../constants";

interface UISliceState {
  mobileBreakpoint: boolean
  tabletBreakpoint: boolean
  isLoading: boolean
}

const uiInitialState: UISliceState = {
  mobileBreakpoint: false,
  tabletBreakpoint: false,
  isLoading: false
}

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    setMobileBreakpoint: (state, action) => {
      state.mobileBreakpoint = action.payload
    },
    setTabletBreakpoint: (state, action) => {
      state.tabletBreakpoint = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

export const uiActions = uiSlice.actions
export const uiReducer = uiSlice.reducer