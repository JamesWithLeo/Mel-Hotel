import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  Reset,
  IncrementDays,
  DecrementDays,
  DecrementRoom,
  SetSchedule,
  IncrementRoom,
  SetBookedDate,
  // CheckOut,
  SetTotalPrice,
} from "../redux slices/bookSlice";
import { AppDispatch, AppState, hotelStore } from "../hotelStore";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SchedLayout() {
  const [isSummaryVisible, setIsSummaryVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: AppState) => state.auth);
  const bookingState = useSelector((state: AppState) => state.booking);

  const HandleCheckOut = async () => {
    const newBooking = { ...bookingState, uid: auth.user?._id };
    const document = await axios.post("/melhotel/book/", newBooking);
    if (document.data.insertedId) {
      setIsSummaryVisible(false);
      navigate("/package", { replace: true });
    }
  };

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
    if (date.value) {
      console.log(new Date(date.value).getTime());
      dispatch(SetSchedule(new Date(date.value).getTime()));
    }
  };
  const { user } = useSelector((state: AppState) => state.auth);
  const { location } = useSelector((state: AppState) => state.booking);
  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
  } else if (!location) {
    return <Navigate to={"/book/location"} replace={true} />;
  }
  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <div className="flex w-full max-w-md flex-col items-center gap-2 px-2 py-2 md:mt-8 md:gap-8">
          <div className="outline-primarydarker flex h-max w-full flex-col items-center justify-between gap-2 rounded bg-white p-4 text-sm shadow sm:flex-row sm:text-base">
            <h1 className="mr-2 flex items-center font-mono text-neutral-500">
              Number of Room : {bookingState.numberOfRooms}
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
              Scheduled date:{" "}
              {new Date(bookingState.scheduledDate).toDateString()}
            </label>
            <input
              className="text-contrast bg-gray-100 px-2 outline-none drop-shadow"
              type="date"
              id="scheduleDateInput"
              required
              min={new Date().toString()}
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

          <button
            className="bg-contrast rounded px-3 py-1 text-white shadow drop-shadow delay-300 duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsSummaryVisible(true);
              dispatch(SetTotalPrice());
            }}
          >
            Booking summary
          </button>
        </div>
      </div>

      {isSummaryVisible ? (
        <>
          <div
            className="bg-primarydark absolute left-0 top-0 z-10 h-full w-full opacity-50 backdrop-blur-sm"
            onClick={() => {
              setIsSummaryVisible(false);
              dispatch(SetBookedDate());
            }}
          />
          <div className="bg-contrast absolute left-1/2 top-1/4 z-10 flex w-full max-w-md -translate-x-1/2 flex-col gap-4 rounded border-4 border-dashed px-4 py-8 shadow drop-shadow">
            <h1>Package: {bookingState.hotelPackage}</h1>
            <h1>Location: {bookingState.location}</h1>
            <h1>
              {bookingState.numberOfRooms === 1 ? "Room" : "Rooms"}:{" "}
              {bookingState.numberOfRooms}
            </h1>
            <h1>
              Staying for {bookingState.daysOfStaying}{" "}
              {bookingState.daysOfStaying === 1 ? "day" : "days"}
            </h1>
            <h1>
              book on {new Date(bookingState.bookedDate).toLocaleString()}
            </h1>
            <h1>
              scheduled on{" "}
              {new Date(bookingState.scheduledDate).toLocaleString()}
            </h1>
            <hr className="border-2" />
            <h1 className="self-end text-sm">
              Total Amounting of : ${bookingState.totalPrice}{" "}
            </h1>
            <button
              className="w-max self-end rounded bg-white px-3 py-1 font-mono text-xs"
              onClick={HandleCheckOut}
            >
              Check out
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
