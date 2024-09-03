import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  Reset,
  IncrementDays,
  DecrementDays,
  DecrementRoom,
  SetSchedule,
  IncrementRoom,
  SetCreatedAt,
  // CheckOut,
  SetTotalPrice,
  IBookSlice,
} from "../redux slices/bookSlice";
import axios from "axios";
import { AppDispatch, AppState, hotelStore } from "../hotelStore";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Notification from "../notification";

export default function SchedLayout() {
  const [isSummaryVisible, setIsSummaryVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: AppState) => state.auth);
  const bookingState = useSelector((state: AppState) => state.booking);
  const [notification, setNotification] = useState<string>("");
  const query = useQuery({
    queryKey: ["bookings"],
    queryFn: () => {
      const response = axios.get("/melhotel/book/" + user?._id);
      return response;
    },
  });
  const HandleCheckOut = async () => {
    if (!bookingState.startingDate) return;
    if (!query.data) return;
    const data = query.data.data;
    const active = data.active as IBookSlice[];
    const pending = data.pending as IBookSlice[];
    const bookings = active.concat(...pending);

    const isOverlapping = bookings.some(
      (booking) =>
        bookingState.startingDate < booking.endingDate &&
        bookingState.endingDate > booking.startingDate,
    );
    if (isOverlapping) {
      setIsSummaryVisible(false);
      console.log("overlapping :", isOverlapping);
      setNotification(
        "Schedule can't overlap the with your other scheduled package.",
      );
      return;
    }

    const newBooking = { ...bookingState, uid: auth.user?._id };
    axios
      .post("/melhotel/book/" + user?._id, newBooking)
      .then((value) => {
        if (value.data.insertedId) {
          setIsSummaryVisible(false);
          navigate("/package", { replace: true });
        } else {
          console.log(value);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const onIncrementRooms = () => {
    dispatch(IncrementRoom());
  };

  const onDecrementRooms = () => {
    dispatch(DecrementRoom());
  };

  const onIncrementBookedDays = () => {
    dispatch(IncrementDays());
    if (bookingState.endingDate !== 0) {
      const oneDay = 1;
      const newEndingDate = new Date(bookingState.endingDate);
      newEndingDate.setDate(newEndingDate.getDate() + oneDay);
      dispatch(
        SetSchedule({
          startingDate: bookingState.startingDate,
          endingDate: newEndingDate.getTime(),
        }),
      );
    }
  };
  const onDecrementBookedDays = () => {
    dispatch(DecrementDays());
    if (bookingState.endingDate !== 0) {
      const oneDay = 1;
      const newEndingDate = new Date(bookingState.endingDate);
      newEndingDate.setDate(newEndingDate.getDate() - oneDay);
      dispatch(
        SetSchedule({
          startingDate: bookingState.startingDate,
          endingDate: newEndingDate.getTime(),
        }),
      );
    }
  };

  const onResetBooking = () => {
    console.log(hotelStore.getState().booking);
    dispatch(Reset());
  };
  const getDateLimit = ({ limitBy }: { limitBy: "min" | "max" }) => {
    let year;
    let dateString;
    let monthString;
    if (limitBy === "min") {
      year = new Date().getFullYear().toString();
      dateString = new Date().getDate().toString();
      monthString = (new Date().getMonth() + 1).toString();
    } else {
      year = (new Date().getFullYear() + 1).toString();
      dateString = new Date().getDate().toString();
      monthString = (new Date().getMonth() + 1).toString();
    }
    // add zero to the single number
    const date = dateString.length === 1 ? "0" + dateString : dateString;
    const month = monthString.length === 1 ? "0" + monthString : dateString;
    return [year, month, date].join("-") + `T00:00`;
  };

  const onSetDate = () => {
    let startingDateInput = document.getElementById(
      "scheduleDateInput",
    ) as HTMLInputElement;
    if (!startingDateInput.value) return;
    // console.log(startingDateInput.value)
    // This format is a standard ISO 8601 representation of date and time.
    // YYYY-MM-DDTHH:MM

    const datetimeSeparated = startingDateInput.value.split("T"); // separate the time and date
    const timeString = datetimeSeparated[1].split(":");
    const hours = parseInt(timeString[0]);
    const time = parseInt(timeString[1]);

    const dateString = datetimeSeparated[0].split("-");
    const month = parseInt(dateString[1]) - 1; // month is 0-based
    const day = parseInt(dateString[2]);
    const year = parseInt(dateString[0]);
    const date = new Date(year, month, day);
    date.setDate(date.getDate() + bookingState.daysOfStaying);
    date.setHours(hours);
    date.setMinutes(time);

    const startDateEpoch = new Date(startingDateInput.value).getTime();
    const endDateEpoch = date.getTime();

    dispatch(
      SetSchedule({ startingDate: startDateEpoch, endingDate: endDateEpoch }),
    );
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
      {notification ? (
        <Notification
          notificationText={notification}
          onClose={() => {
            setNotification("");
          }}
        />
      ) : null}
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
              Staring on:{" "}
              {bookingState.startingDate
                ? new Date(bookingState.startingDate).toLocaleString()
                : null}
            </label>
            <input
              className="text-contrast bg-gray-100 px-2 outline-none drop-shadow"
              type={"datetime-local"}
              id="scheduleDateInput"
              required
              min={getDateLimit({ limitBy: "min" })}
              max={getDateLimit({ limitBy: "max" })}
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
              dispatch(SetCreatedAt());
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
              scheduled on{" "}
              {bookingState.startingDate
                ? new Date(bookingState.startingDate).toLocaleString()
                : null}
            </h1>
            <h1>
              ending on{" "}
              {bookingState.startingDate
                ? new Date(bookingState.endingDate).toLocaleString()
                : null}
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
