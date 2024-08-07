import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronLeft,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Reset,
  IncrementDays,
  DecrementDays,
  SetBookedDate,
  DecrementRoom,
  IncrementRoom,
} from "../redux slices/bookSlice";
import { AppState, hotelStore } from "../hotelStore";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
let date = new Date().toLocaleDateString().split("/");
if (date[0].length === 1) {
  date[0] = 0 + date[0];
}
export default function SchedLayout() {
  const dispatch = useDispatch();

  const bookingState = useSelector((state: AppState) => state.booking);
  const dateToday = [date[2], date[0], date[1]].join("-");
  const onIncrementRooms = () => {
    dispatch(IncrementRoom());
  };

  const onDecrementRooms = () => {
    dispatch(DecrementRoom());
  };
  const onIncrementBookedDays = () => {
    dispatch(IncrementDays());
  };

  const onDecrementBookedDays = () => {
    dispatch(DecrementDays());
  };
  const onResetBooking = () => {
    console.log(hotelStore.getState().booking);
    dispatch(Reset());
  };

  const onSetDate = () => {
    let date = document.getElementById("scheduleDateInput") as HTMLInputElement;
    // if book, current or later
    if (date.value >= date.min) {
      let sep = date.value.split("-");
      dispatch(SetBookedDate([sep[1], sep[2], sep[0]].join("/")));
    }
  };
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-md flex-col items-center gap-2 px-2 py-2 md:mt-8 md:gap-8">
        <div className="outline-primarydarker flex h-max w-full flex-col items-center justify-between gap-2 rounded bg-white p-4 text-sm shadow sm:flex-row sm:text-base">
          <h1 className="mr-2 flex items-center font-mono text-neutral-500">
            Number of Rooms : {bookingState.numberOfRooms}
          </h1>
          <div className="drop-shadow">
            <button
              className="text-contrast h-full bg-gray-100 px-4"
              onClick={onDecrementRooms}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <button
              className="text-contrast h-full bg-gray-100 px-4"
              onClick={onIncrementRooms}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className="outline-primarydarker flex w-full flex-col items-center justify-between gap-2 rounded bg-white px-4 py-4 shadow sm:flex-row">
          <h1 className="flex items-center font-mono text-neutral-500">
            Days of Staying : {bookingState.daysOfStaying}
          </h1>
          <div className="drop-shadow">
            <button
              className="text-contrast h-full bg-gray-100 px-4"
              onClick={onDecrementBookedDays}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <button
              className="text-contrast h-full bg-gray-100 px-4"
              onClick={onIncrementBookedDays}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className="outline-primarydarker flex h-max w-full flex-col items-center justify-between gap-2 rounded bg-white px-4 py-4 shadow sm:flex-row">
          <label
            htmlFor="scheduleDateInput"
            className="flex items-center font-mono text-neutral-500"
          >
            Scheduled date: {bookingState.scheduledDate}
          </label>
          <input
            className="text-contrast bg-gray-100 px-2 drop-shadow"
            type="date"
            id="scheduleDateInput"
            required
            min={dateToday}
            onChange={onSetDate}
          />
        </div>
        <div className="flex gap-4 self-end">
          <button
            onClick={onResetBooking}
            className="rounded bg-red-200 px-4 py-1 text-sm text-red-400 shadow drop-shadow"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
