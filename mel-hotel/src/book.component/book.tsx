import BookNav from "./bookNav";
import { Outlet, NavLink } from "react-router-dom";
import { AppState, hotelStore } from "../hotelStore";
import { useDispatch, useSelector } from "react-redux";

export default function Book() {
  return (
    <div className="flex h-dvh flex-col items-center overflow-hidden bg-gray-50">
      <BookNav linkTo={"/"} destination={"home"} />
      <div className="flex w-full justify-center bg-gray-100 py-2">
        {/* <h1 className="font-cinzel text-xs md:text-sm">
            &middot; Booking &middot;
          </h1> */}
        <NavLink
          to={"package/" + hotelStore.getState().booking.package}
          className={({ isPending, isActive, isTransitioning }) =>
            [
              isPending
                ? "font-cinzel border-contrast border-b-2 border-solid px-2 text-xs md:text-sm"
                : "",
              isActive
                ? "font-cinzel border-contrast border-b-2 border-solid px-2 text-xs md:text-sm"
                : "font-cinzel border-b-2 border-solid px-2 text-xs md:text-sm",
              isTransitioning
                ? "font-cinzel border-contrast border-b-2 border-solid px-2 text-xs md:text-sm"
                : "",
            ].join(" ")
          }
        >
          Packages
        </NavLink>
        <NavLink
          to={"location"}
          className={({ isPending, isActive, isTransitioning }) =>
            [
              isPending ? "" : "",
              isActive
                ? "font-cinzel border-contrast border-b-2 border-solid px-2 text-xs md:text-sm"
                : "font-cinzel border-b-2 border-solid px-2 text-xs md:text-sm",
              isTransitioning ? "" : "",
            ].join(" ")
          }
        >
          Branch
        </NavLink>
        <NavLink
          to={"schedule"}
          className={({ isPending, isActive, isTransitioning }) =>
            [
              isPending ? "" : "",
              isActive
                ? "font-cinzel border-contrast border-b-2 border-solid px-2 text-xs md:text-sm"
                : "font-cinzel border-b-2 border-solid px-2 text-xs md:text-sm",
              isTransitioning ? "" : "",
            ].join(" ")
          }
        >
          Schedule
        </NavLink>
      </div>
      <div className="h-full w-full">
        <Outlet />
      </div>
    </div>
  );
}
