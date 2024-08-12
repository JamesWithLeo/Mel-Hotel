import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { packagesData } from "../packages.component/packagesObj";

import axios from "axios";

import { IUser, SetUser } from "./authSlice";
export interface IBookSlice {
  hotelPackage: "regular" | "premium" | "luxury" | "ordinary";
  daysOfStaying: number;
  numberOfRooms: number;
  scheduledDate: string;
  location: string | null;
  bookedDate: string;
  time: string;
  totalPrice: number;
}

const initSlice: IBookSlice = {
  hotelPackage: "ordinary",
  daysOfStaying: 1,
  numberOfRooms: 1,
  location: null,
  scheduledDate: new Date().toLocaleDateString(),
  bookedDate: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString(),
  totalPrice: 0,
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
    SetSchedule: (state, action: PayloadAction<string>) => {
      state.scheduledDate = action.payload;
    },
    SetBookedDateAndTime: (state) => {
      state.bookedDate = new Date().toLocaleDateString();
      state.time = new Date().toLocaleTimeString();
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
      state.bookedDate = new Date().toLocaleDateString();
      state.scheduledDate = new Date().toLocaleDateString();
      state.hotelPackage = "ordinary";
      state.time = new Date().toLocaleTimeString();
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CheckOut.fulfilled, (state, action) => {});
  },
});

const CheckOutRequest = async (id: string, state: IBookSlice) => {
  return axios
    .post("/account/update/" + id, {
      Active: {
        ...state,
      },
    })
    .then((response) => {
      return response.data;
    });
};
export const CheckOut = createAsyncThunk(
  "booking/CheckOut",
  async ({ id, state }: { id: string; state: IBookSlice }, { dispatch }) => {
    try {
      const document: IUser = await CheckOutRequest(id, state);
      if (!document) return { user: null };
      localStorage.removeItem("melhotelUser");
      localStorage.setItem("melhotelUser", JSON.stringify(document));
      dispatch(SetUser(document));
      return { user: document };
    } catch (error) {
      return { user: null };
    }
  },
);

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
  SetBookedDateAndTime,
} = {
  ...bookSlice.actions,
};
export default bookSlice.reducer;
