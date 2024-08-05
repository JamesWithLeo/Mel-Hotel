import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { hotelStore } from "./hotelStore";

interface INavClass {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}
function App() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const navClass = ({ isActive, isPending, isTransitioning }: INavClass) => {
    return [
      isPending
        ? "border-b-4 border-contrast font-bold text-primarydarker "
        : "text-primarydark border-b-4 border-contrast",
      isActive
        ? "border-b-4 border-contrast font-bold text-primarydarker opacity-100"
        : "text-primarydark rounded border-none border-contrast opacity-100",
      isTransitioning ? "" : "",
    ].join(" ");
  };
  React.useEffect(() => {
    const fetchHome = async () => {
      await fetch("/hotel").then(async (response) => {
        await response.json().then((value) => {
          console.log(value);
        });
      });
    };
    fetchHome();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <header className="sticky top-0 z-50 flex h-16 min-h-16 w-full max-w-7xl justify-between bg-gray-100 px-8 opacity-95 backdrop-blur backdrop-opacity-20">
        <div></div>
        <div className="hidden h-full items-center gap-8 opacity-100 md:flex">
          <NavLink to={"/"} className={navClass}>
            Home
          </NavLink>
          <NavLink to={"pricing"} className={navClass}>
            Pricing
          </NavLink>
          <NavLink to={"review"} className={navClass}>
            Review
          </NavLink>
          <NavLink to={"location"} className={navClass}>
            Location
          </NavLink>
          {/* <NavLink to={"contact"} className={navClass}>
            Contact us
          </NavLink> */}
        </div>
        <div className="flex items-center gap-8">
          {hotelStore.getState().auth.authType === "admin" ? (
            <NavLink to={"admin"}>Admin</NavLink>
          ) : null}

          {hotelStore.getState().auth.isAuth ? (
            <NavLink
              to={"/profile"}
              onClick={() => {
                console.log(hotelStore.getState().auth.isAuth);
              }}
              className={({ isPending, isActive, isTransitioning }) =>
                [
                  isActive ? "text-contrast" : "text-primarydarker",
                  isPending ? "" : "",
                  isTransitioning ? "" : "",
                ].join(" ")
              }
            >
              <FontAwesomeIcon icon={faUser} className="align-bottom text-xl" />
            </NavLink>
          ) : (
            <NavLink to={"/login"} className={"text-primarydarker border-b-4"}>
              <FontAwesomeIcon icon={faUser} className="align-bottom text-xl" />
            </NavLink>
          )}
          <button
            className="text-primarydarker flex items-center text-2xl md:hidden"
            onClick={() => {
              setIsNavOpen(!isNavOpen);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        {isNavOpen && (
          <div className="fixed right-2 top-16 flex h-max flex-col items-center gap-8 bg-gray-200 px-8 py-4 opacity-100 md:hidden">
            <NavLink to={"/"} className={navClass}>
              Home
            </NavLink>
            <NavLink to={"pricing"} className={navClass}>
              Pricing
            </NavLink>
            <NavLink to={"review"} className={navClass}>
              Review
            </NavLink>
            <NavLink to={"location"} className={navClass}>
              Location
            </NavLink>
            <NavLink to={"contact"} className={navClass}>
              Contact us
            </NavLink>
          </div>
        )}
      </header>
      <div className="flex h-full w-full max-w-7xl" id="routesWrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
