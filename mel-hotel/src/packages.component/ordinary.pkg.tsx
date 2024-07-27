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
import ordinaryBedroom from "../assets/images/ordinary-bedroom.jpg";
import ordinaryBathroom from "../assets/images/ordinary-bathroom.jpg";
export default function Ordinary() {
  let date = new Date().toLocaleDateString().split("/");
  if (date[0].length === 1) {
    date[0] = 0 + date[0];
  }
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
    <div className="mt-16 flex w-full flex-row-reverse justify-center bg-gray-50">
      <div className="flex w-3/4 flex-col gap-4">
        <div className="sticky top-0 flex h-40 w-full flex-col bg-gray-50 bg-gradient-to-b from-gray-100 from-20% px-4 py-2 pb-4">
          <h1 className="font-fauna text-contrast text-2xl font-bold">
            Ordinary Room
          </h1>
          <h1 className="w-max text-sm text-slate-800">
            Budget-conscious travelers and guests seeking a basic stay.
          </h1>

          <div className="flex gap-2">
            <button className="rounded bg-slate-300 px-2 text-sm">
              Review & Rating
            </button>
            <button className="rounded bg-slate-300 px-2 text-sm">
              Photos
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col px-8">
          <h1>Inclusions:</h1>
          <h1>Standard room with a comfortable double bed or twin beds.</h1>
          <img src={ordinaryBedroom} alt="ordinary bedroom" className="w-2/5" />
          <h1>En-suite bathroom with complimentary toiletries.</h1>
          <img
            src={ordinaryBathroom}
            alt="ordinary bathroom"
            className="w-2/5"
          />
          <h1>Free Wi-Fi.</h1>
          <h1>Flat-screen TV with cable channels</h1>
          <h1>Air Conditioning</h1>
          <h1>Coffee and tea making facilities</h1>
          <h1>Daily housekeeping</h1>
          <h1>Additional Services (Optional at Extra Cost)</h1>
          <h1>Access to the swimming pool and fitness center</h1>
          <h1>Breakfast buffet</h1>
          <h1>Laundry and dry cleaning services</h1>
          <h1>Room service</h1>
        </div>
      </div>

      <div className="flex w-1/4 flex-col gap-4 px-2">
        <div className="outline-primarydarker flex h-10 w-full justify-between rounded bg-white py-0 pl-4 text-sm shadow sm:text-base">
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
        <div className="outline-primarydarker flex h-10 w-full justify-between rounded bg-white py-0 pl-4 text-sm shadow sm:text-base">
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

        <div className="outline-primarydarker flex h-10 w-full justify-between rounded bg-white py-0 pl-4 text-sm shadow sm:text-base">
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
  );
}
