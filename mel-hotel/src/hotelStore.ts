import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./redux slices/bookingSlice";

export const hotelStore = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});
export type AppState = ReturnType<typeof hotelStore.getState>;
export type AppDispatch = typeof hotelStore.dispatch;
