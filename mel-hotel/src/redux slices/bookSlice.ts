import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBookSlice {
  package: "regular" | "premium" | "luxury" | "ordinary";
  daysOfStaying: number;
  numberOfRooms: number;
  scheduledDate: string;
  bookedDate: string;
  location: string | null;
}
const initSliceReadOnly: IBookSlice = {
  package: "ordinary",
  daysOfStaying: 1,
  numberOfRooms: 1,
  location: null,
  scheduledDate: new Date().toLocaleDateString(),
  bookedDate: new Date().toLocaleDateString(),
};
const initSlice: IBookSlice = {
  package: "ordinary",
  daysOfStaying: 1,
  numberOfRooms: 1,
  location: null,
  scheduledDate: new Date().toLocaleDateString(),
  bookedDate: new Date().toLocaleDateString(),
};

const bookSlice = createSlice({
  name: "booking",
  initialState: initSlice,
  reducers: {
    SetPackage: (
      state,
      actiom: PayloadAction<"regular" | "premium" | "luxury" | "ordinary">,
    ) => {
      state.package = actiom.payload;
    },
    IncrementDays: (state) => {
      state.daysOfStaying++;
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
    SetBookedDate: (state, action: PayloadAction<string>) => {
      state.scheduledDate = action.payload;
    },
    Reset: (state) => {
      state.numberOfRooms = initSliceReadOnly.numberOfRooms;
      state.bookedDate = initSliceReadOnly.bookedDate;
      state.daysOfStaying = initSliceReadOnly.daysOfStaying;
      state.scheduledDate = initSliceReadOnly.scheduledDate;
      state.package = initSliceReadOnly.package;
    },
  },
});
export const {
  SetPackage,
  Reset,
  DecrementDays,
  IncrementDays,
  DecrementRoom,
  IncrementRoom,
  SetBookedDate,
  SetBookLocation,
} = {
  ...bookSlice.actions,
};
export default bookSlice.reducer;
