import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { packagesData } from "../packages.component/packagesObj";
export const countryDropDownOption = [
  "Philippines",
  "Swizterland",
  "Shanghai",
  "Saudi Arabia",
];
export interface IBookSlice {
  hotelPackage: "regular" | "premium" | "luxury" | "ordinary";
  daysOfStaying: number;
  numberOfRooms: number;
  startingDate: number;
  endingDate: number;
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
  startingDate: 0,
  endingDate: 0,
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
    SetSchedule: (
      state,
      action: PayloadAction<{ startingDate: number; endingDate: number }>,
    ) => {
      state.startingDate = action.payload.startingDate;
      state.endingDate = action.payload.endingDate;
    },
    SetCreatedAt: (state) => {
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
      state.startingDate = 0;
      state.endingDate = 0;
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
  SetCreatedAt,
} = {
  ...bookSlice.actions,
};
export default bookSlice.reducer;
