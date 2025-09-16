import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mapReducer } from "./mapSlice";
import { uiReducer } from "./uiSlice";

const rootReducer = combineReducers({
  ui: uiReducer,
  map: mapReducer
});

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store

export default store
