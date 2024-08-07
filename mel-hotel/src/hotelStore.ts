import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./redux slices/bookSlice";
import authReducer from "./redux slices/authSlice";
export const hotelStore = configureStore({
  reducer: {
    booking: bookingReducer,
    auth: authReducer,
  },
});
export type AppState = ReturnType<typeof hotelStore.getState>;
export type AppDispatch = typeof hotelStore.dispatch;
