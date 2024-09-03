import { faBars, faCogs, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AppState, hotelStore } from "./hotelStore";
import { useSelector } from "react-redux";

interface INavClass {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const active = useSelector((state: AppState) => state.auth.isActive);
  const user = useSelector((state: AppState) => state.auth.user);
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

  const fetchHome = async () => {
    await fetch("/hotel").then(async (response) => {
      await response.json().then((value) => {
        console.log(value);
      });
    });
  };
  useEffect(() => {
    fetchHome();
  }, []);
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center">
        <header className="sticky top-0 z-50 flex h-16 min-h-16 w-full max-w-7xl justify-between bg-gray-100 px-4 opacity-95 backdrop-blur backdrop-opacity-20 lg:px-8">
          <div></div>
          <div className="hidden h-full items-center gap-8 opacity-100 md:flex">
            <NavLink to={"/"} className={navClass}>
              Home
            </NavLink>
            <NavLink to={"pricing"} className={navClass}>
              Pricing
            </NavLink>

            <NavLink to={"location"} className={navClass}>
              Location
            </NavLink>
          </div>
          <div className="flex items-center gap-8">
            {user?.role === "admin" ? (
              <NavLink
                to={"admin"}
                className={({ isPending, isActive, isTransitioning }) =>
                  [
                    isActive
                      ? "text-contrast flex items-center gap-4 text-xl"
                      : "text-primarydarker flex items-center gap-4 text-xl",
                    isPending ? "" : "",
                    isTransitioning ? "" : "",
                  ].join(" ")
                }
              >
                <FontAwesomeIcon icon={faCogs} />
              </NavLink>
            ) : null}

            {user ? (
              <NavLink
                to={"/profile"}
                className={({ isPending, isActive, isTransitioning }) =>
                  [
                    isActive
                      ? "text-contrast hidden items-center gap-4 md:flex"
                      : "text-primarydarker hidden items-center gap-4 md:flex",
                    isPending ? "" : "",
                    isTransitioning ? "" : "",
                  ].join(" ")
                }
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="align-bottom text-xl"
                />
              </NavLink>
            ) : (
              <NavLink
                to={"/login"}
                className={"text-primarydarker hidden= border-b-4 sm:block"}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="align-bottom text-xl"
                />
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
            <div className="fixed right-2 top-16 z-10 flex h-max flex-col items-center gap-8 bg-gray-200 px-8 py-4 opacity-100 md:hidden">
              {hotelStore.getState().auth.user?.role ? (
                <NavLink
                  to={"/profile"}
                  onClick={() => {
                    console.log(hotelStore.getState().auth);
                  }}
                  className={({ isPending, isActive, isTransitioning }) =>
                    [
                      isActive
                        ? "text-contrast flex items-center gap-4"
                        : "text-primarydarker flex items-center gap-4",
                      isPending ? "" : "",
                      isTransitioning ? "" : "",
                    ].join(" ")
                  }
                >
                  Profile
                </NavLink>
              ) : (
                <NavLink
                  to={"/login"}
                  className={({ isPending, isActive, isTransitioning }) =>
                    [
                      isActive
                        ? "text-contrast flex items-center gap-4"
                        : "text-primarydarker flex items-center gap-4",
                      isPending ? "" : "",
                      isTransitioning ? "" : "",
                    ].join(" ")
                  }
                >
                  Profile
                </NavLink>
              )}
              <NavLink to={"/"} className={navClass}>
                Home
              </NavLink>
              <NavLink to={"pricing"} className={navClass}>
                Pricing
              </NavLink>

              <NavLink to={"location"} className={navClass}>
                Location
              </NavLink>
            </div>
          )}
        </header>
        <div className="flex h-full w-full max-w-7xl" id="routesWrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
