import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { Link, Navigate, NavLink } from "react-router-dom";
import { Reset } from "../redux slices/bookSlice";
export default function BookNav({
  linkTo,
  destination = "home",
}: {
  linkTo: string;
  destination: string;
}) {
  const dispatch = useDispatch();
  const handleGotoHome = () => {
    dispatch(Reset());
  };
  return (
    <div className="sticky top-0 z-10 grid h-16 max-h-16 min-h-16 w-full max-w-7xl grid-cols-3 bg-gray-100 px-8 text-center opacity-100">
      <Link
        to={linkTo}
        className="text-primarydarker flex items-center text-left font-bold"
        onClick={handleGotoHome}
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
      </div>
    </div>
  );
}
