import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IVipSlice {
  vipPackage: "regular" | "premium" | "luxury" | null;
  daysOfStaying: number;
  scheduledDate: string;
  bookedDate: string;
}
const vipSliceOriginal: IVipSlice = {
  vipPackage: null,
  daysOfStaying: 1,
  scheduledDate: new Date().toLocaleDateString(),
  bookedDate: new Date().toLocaleDateString(),
};
const vipSliceInit: IVipSlice = {
  vipPackage: null,
  daysOfStaying: 1,
  scheduledDate: new Date().toLocaleDateString(),
  bookedDate: new Date().toLocaleDateString(),
};

const vipSlice = createSlice({
  name: "vipBooking",
  initialState: vipSliceInit,
  reducers: {
    SetVipPackage: (
      state,
      actiom: PayloadAction<"regular" | "premium" | "luxury">,
    ) => {
      state.vipPackage = actiom.payload;
    },
    IncrementDays: (state) => {
      state.daysOfStaying++;
    },
    DecrementDays: (state) => {
      if (state.daysOfStaying > 1) {
        state.daysOfStaying--;
      }
    },
    SetBookedDate: (state, action: PayloadAction<string>) => {
      state.scheduledDate = action.payload;
    },
    Reset: (state) => {
      state.bookedDate = vipSliceOriginal.bookedDate;
      state.daysOfStaying = vipSliceOriginal.daysOfStaying;
      state.scheduledDate = vipSliceOriginal.scheduledDate;
      state.vipPackage = vipSliceOriginal.vipPackage;
    },
  },
});
export const {
  SetVipPackage,
  Reset,
  DecrementDays,
  IncrementDays,
  SetBookedDate,
} = {
  ...vipSlice.actions,
};
export default vipSlice.reducer;
