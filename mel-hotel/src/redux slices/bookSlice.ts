import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { packagesData } from "../packages.component/packagesObj";

export interface IBookSlice {
  hotelPackage: "regular" | "premium" | "luxury" | "ordinary";
  daysOfStaying: number;
  numberOfRooms: number;
  scheduledDate: number;
  location: string | null;
  bookedDate: number;
  totalPrice: number;
  _id: string | null;
  uid: string | null;
}

const initSlice: IBookSlice = {
  hotelPackage: "ordinary",
  daysOfStaying: 1,
  numberOfRooms: 1,
  location: null,
  scheduledDate: new Date().getTime(),
  bookedDate: new Date().getTime(),
  totalPrice: 0,
  _id: null,
  uid: null,
};

const bookSlice = createSlice({
  name: "booking",
  initialState: initSlice,
  reducers: {
    SetPackage: (
      state,
      action: PayloadAction<"regular" | "premium" | "luxury" | "ordinary">,
    ) => {
      state.hotelPackage = action.payload;
    },
    IncrementDays: (state) => {
      if (state.daysOfStaying < 30) {
        state.daysOfStaying++;
      }
    },
    DecrementDays: (state) => {
      if (state.daysOfStaying > 1) {
        state.daysOfStaying--;
      }
    },
    IncrementRoom: (state) => {
      state.numberOfRooms++;
    },
    DecrementRoom: (state) => {
      if (state.numberOfRooms > 1) {
        state.numberOfRooms--;
      }
    },
    SetBookLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    SetSchedule: (state, action: PayloadAction<number>) => {
      state.scheduledDate = action.payload;
    },
    SetBookedDate: (state) => {
      state.bookedDate = new Date().getTime();
    },
    SetTotalPrice: (state) => {
      packagesData.forEach((value) => {
        if (state.hotelPackage === value.packageName) {
          state.totalPrice = state.daysOfStaying * value.pricePerDay;
        }
      });
    },
    Reset: (state) => {
      state.numberOfRooms = 1;
      state.location = null;
      state.daysOfStaying = 1;
      state.bookedDate = new Date().getTime();
      state.scheduledDate = new Date().getTime();
      state.hotelPackage = "ordinary";
      state.totalPrice = 0;
      state._id = null;
      state.uid = null;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  SetPackage,
  Reset,
  DecrementDays,
  IncrementDays,
  DecrementRoom,
  IncrementRoom,
  SetSchedule,
  SetTotalPrice,
  SetBookLocation,
  SetBookedDate,
} = {
  ...bookSlice.actions,
};
export default bookSlice.reducer;
