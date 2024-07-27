import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppState } from "../hotelStore";
import {} from "../redux slices/bookingSlice";

export default function BookingSelection() {
  const bookingState = useSelector((state: AppState) => state.booking);
  const dispatch = useDispatch();

  return (
    <>
      <NavLink
        className="mt-16 flex w-1/3 rounded bg-[#f5b97c] p-4"
        to={"/room"}
      >
        {" "}
        <h1>Ordinary Room </h1>
      </NavLink>
      <NavLink
        className="bg-contrast mt-16 flex w-1/3 rounded p-4"
        to={"/hotel"}
      >
        <h1>Hotel Package</h1>
      </NavLink>
    </>
  );
}
