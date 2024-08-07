import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate, NavLink } from "react-router-dom";
export default function BookNav({
  linkTo,
  destination = "home",
}: {
  linkTo: string;
  destination: string;
}) {
  return (
    <div className="sticky top-0 z-10 grid h-16 max-h-16 min-h-16 w-full max-w-7xl grid-cols-3 bg-gray-100 px-8 text-center opacity-100">
      <Link
        to={linkTo}
        className="text-primarydarker flex items-center text-left font-bold"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-contrast text-base"
        />
        <h1 className="hidden sm:block">{destination}</h1>
      </Link>
      <div className="flex flex-col justify-center">
        <h1 className="font-cinzel md:text-xl">Mel Hotel</h1>
        <h1 className="font-cinzel text-xs md:text-sm">
          &middot; Booking &middot;
        </h1>
        {/* <div className="flex justify-center">
          <NavLink
            to={"package"}
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
        </div> */}
      </div>
    </div>
  );
}
