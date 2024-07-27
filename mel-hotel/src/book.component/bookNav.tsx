import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate } from "react-router-dom";
export default function BookNav({
  linkTo,
  destination = "home",
}: {
  linkTo: string;
  destination: string;
}) {
  return (
    <div className="sticky top-0 grid h-16 max-h-16 min-h-16 w-full max-w-7xl grid-cols-3 bg-gray-100 px-8 text-center opacity-100">
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
      </div>
      {/* <h1 className="text-primarydark flex items-center justify-end text-right text-xs">
        Today's Date is {new Date().toLocaleDateString().split("/").join("-")}
      </h1> */}
    </div>
  );
}
