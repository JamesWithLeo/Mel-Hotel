import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IBookedType = "regular" | "premium" | "luxury";

interface IBookingReducer {
  numberOfRooms: number;
  dateOfBooking: string;
  bookedDays: number;
  BookedType: IBookedType;
  Date: string;
}
let date = new Date().toLocaleDateString().split("/");
if (date[0].length === 1) {
  date[0] = 0 + date[0];
}
const dateToday = [date[2], date[1], date[0]].reverse().join("/");
const BookingInit: IBookingReducer = {
  numberOfRooms: 1,
  bookedDays: 1,
  dateOfBooking: new Date().toLocaleDateString(),
  Date: dateToday,
  BookedType: "regular",
};
const BookingInitialState: IBookingReducer = {
  numberOfRooms: 1,
  bookedDays: 1,
  dateOfBooking: new Date().toLocaleDateString(),
  Date: dateToday,
  BookedType: "regular",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: BookingInitialState,
  reducers: {
    IncrementRoom: (state) => {
      state.numberOfRooms++;
    },
    DecrementRoom: (state) => {
      if (state.numberOfRooms > 1) {
        state.numberOfRooms--;
      }
    },
    IncrementDays: (state) => {
      state.bookedDays++;
    },
    DecrementDays: (state) => {
      if (state.bookedDays > 1) {
        state.bookedDays--;
      }
    },
    ResetBooking: (state) => {
      state.Date = BookingInit.Date;
      state.numberOfRooms = BookingInit.numberOfRooms;
      state.BookedType = BookingInit.BookedType;
      state.bookedDays = BookingInit.bookedDays;
      state.dateOfBooking = BookingInit.dateOfBooking;
    },
    SetBookedDate: (state, action: PayloadAction<string>) => {
      state.Date = action.payload;
    },
  },
});
export const {
  IncrementRoom,
  DecrementRoom,
  IncrementDays,
  DecrementDays,
  SetBookedDate,
  ResetBooking,
} = { ...bookingSlice.actions };
export default bookingSlice.reducer;
