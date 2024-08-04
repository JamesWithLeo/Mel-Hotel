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
import {
  faPlus,
  faMinus,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { AppState } from "../hotelStore";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
let date = new Date().toLocaleDateString().split("/");
if (date[0].length === 1) {
  date[0] = 0 + date[0];
}
export default function OrdinaryLayout() {
  const dateToday = [date[2], date[0], date[1]].join("-");

  const bookingState = useSelector((state: AppState) => state.booking);
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
      // console.log([sep[1], sep[2], sep[0]].join("-"));
      dispatch(SetBookedDate([sep[1], sep[2], sep[0]].join("/")));
    }
  };
  return (
    <div className="flex h-full w-full max-w-7xl flex-col flex-wrap justify-center bg-gray-100 md:flex-row">
      <div className="fixed bottom-0 flex w-full flex-col items-center bg-gray-100 shadow md:relative md:h-dvh md:w-1/4">
        <div className="flex h-16 w-full justify-start px-8">
          <Link
            to={"/book"}
            className="text-primarydarker flex items-center text-left font-bold"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-contrast text-base"
            />
            <h1 className="hidden sm:block">back</h1>
          </Link>
        </div>

        <div className="flex flex-col gap-4 px-2">
          <div className="outline-primarydarker flex h-max w-full flex-col items-center justify-between gap-2 rounded bg-white p-4 text-sm shadow sm:text-base">
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

          <div className="outline-primarydarker flex h-max w-full flex-col items-center justify-between gap-2 rounded bg-white p-4 text-sm shadow sm:text-base">
            <h1 className="flex items-center font-mono text-neutral-500">
              Days of Staying : {bookingState.bookedDays}
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

          <div className="outline-primarydarker flex h-max w-full flex-col items-center justify-between gap-2 rounded bg-white p-4 text-sm shadow sm:text-base">
            <label
              htmlFor="scheduleDateInput"
              className="flex items-center font-mono text-neutral-500"
            >
              Scheduled date: {bookingState.Date}
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

          <div className="flex gap-4 self-end text-sm sm:text-base">
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
      </div>

      <div className="w-full md:w-3/4">
        <Outlet />
      </div>
    </div>
  );
}
