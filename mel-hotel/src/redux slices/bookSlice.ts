import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { packagesData } from "../packages.component/packagesObj";

export interface IBookSlice {
  hotelPackage: "regular" | "premium" | "luxury" | "ordinary";
  daysOfStaying: number;
  numberOfRooms: number;
  bookedDate: number;
  location: string | null;
  createdAt: number;
  totalPrice: number;
  _id: string | null;
  uid: string | null;
}

const initSlice: IBookSlice = {
  hotelPackage: "ordinary",
  daysOfStaying: 1,
  numberOfRooms: 1,
  location: null,
  bookedDate: new Date().getTime(),
  createdAt: new Date().getTime(),
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
      state.bookedDate = action.payload;
    },
    SetBookedDate: (state) => {
      state.createdAt = new Date().getTime();
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
      state.createdAt = new Date().getTime();
      state.bookedDate = new Date().getTime();
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
