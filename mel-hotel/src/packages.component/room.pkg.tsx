import {
  DecrementDays,
  DecrementRoom,
  IncrementDays,
  IncrementRoom,
  ResetBooking,
  SetBookedDate,
} from "../redux slices/bookingSlice";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { AppState, hotelStore } from "../hotelStore";
import { useDispatch, useSelector } from "react-redux";

let date = new Date().toLocaleDateString().split("/");
if (date[0].length === 1) {
  date[0] = 0 + date[0];
}
const dateToday = [date[2], date[0], date[1]].join("-");
console.log("date :", dateToday);

export default function Room() {
  const hotelState = useSelector((state: AppState) => state.booking);
  const dispatch = useDispatch();

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
    dispatch(ResetBooking());
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
    <>
      <div className="flex w-full flex-row gap-8 bg-gray-100">
        <div className="flex w-1/2 flex-col gap-4">
          <h1 className="text-neutral-500">Regular Room</h1>
          <div className="outline-primarydarker flex h-10 w-full justify-between rounded bg-white py-0 pl-4 shadow">
            <h1 className="mr-2 flex items-center font-mono text-neutral-500">
              Number of Rooms : {hotelState.numberOfRooms}
            </h1>
            <div className="drop-shadow">
              <button
                className="text-contrast h-full rounded-l-full bg-gray-100 px-4 pl-6"
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

          <div className="outline-primarydarker flex h-10 w-full justify-between rounded bg-white py-0 pl-4 shadow">
            <h1 className="flex items-center font-mono text-neutral-500">
              Days of Staying : {hotelState.bookedDays}
            </h1>
            <div className="drop-shadow">
              <button
                className="text-contrast h-full rounded-l-full bg-gray-100 px-4 pl-6"
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

          <div className="outline-primarydarker flex h-10 w-full justify-between rounded bg-white py-0 pl-4 shadow">
            <label
              htmlFor="scheduleDateInput"
              className="flex items-center font-mono text-neutral-500"
            >
              Scheduled date: {hotelState.Date}
            </label>
            <input
              className="text-contrast rounded-l-full bg-gray-100 pl-4 drop-shadow"
              type="date"
              id="scheduleDateInput"
              required
              min={dateToday}
              onChange={onSetDate}
            />
          </div>

          <div className="flex gap-4 self-end">
            <button className="bg-contrast rounded px-4 py-1">
              Next choose location.
            </button>
            <button
              onClick={onResetBooking}
              className="rounded bg-red-200 px-4 py-1 text-red-400"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="h-full w-1/2 bg-slate-200"></div>
      </div>
    </>
  );
}
