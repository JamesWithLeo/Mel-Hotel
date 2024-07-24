import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export default function BookNav() {
  return (
    <div className="sticky top-0 grid h-16 w-full max-w-7xl grid-cols-3 bg-gray-100 text-center opacity-100">
      <Link to={"/"} className="text-primarydarker text-left font-bold">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-contrast text-base"
        />
        Home
      </Link>
      <div>
        <h1 className="font-cinzel text-2xl">Mel Hotel</h1>
        <h1 className="font-cinzel text-base">&middot; Booking &middot;</h1>
      </div>
      <h1 className="text-primarydark text-right text-xs">
        Today's Date is {new Date().toLocaleDateString().split("/").join("-")}
      </h1>
    </div>
  );
}
