import { NavLink } from "react-router-dom";
export default function BookingSelection() {
  return (
    <>
      <NavLink className="flex w-1/3 rounded bg-[#f5b97c]" to={"room"}>
        {" "}
        <h1>Room Only</h1>
      </NavLink>
      <NavLink className="bg-contrast flex w-1/3 rounded" to={"hotel"}>
        <h1>Hotel Package</h1>
      </NavLink>
    </>
  );
}
