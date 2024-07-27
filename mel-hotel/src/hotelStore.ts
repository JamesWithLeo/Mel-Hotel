import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./redux slices/bookingSlice";
import vipReducer from "./redux slices/vipSlice";
import authReducer from "./redux slices/authSlice";
export const hotelStore = configureStore({
  reducer: {
    booking: bookingReducer,
    vipBooking: vipReducer,
    auth: authReducer,
  },
});
export type AppState = ReturnType<typeof hotelStore.getState>;
export type AppDispatch = typeof hotelStore.dispatch;
