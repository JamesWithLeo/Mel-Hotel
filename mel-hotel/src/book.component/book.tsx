import BookNav from "./bookNav";
import { Outlet, NavLink, Navigate } from "react-router-dom";
import { AppState } from "../hotelStore";
import { useSelector } from "react-redux";
import Notification from "../notification";
import { useState } from "react";

export default function Book() {
  const bookingState = useSelector((state: AppState) => state.booking);
  const user = useSelector((state: AppState) => state.auth.user);
  const [isNotificationPopupVisible, setIsNotificationPopupVisible] =
    useState<boolean>(false);

  const [isLogin, setIslogin] = useState<boolean>(false);

  const showScheduleNotification = () => {
    setIsNotificationPopupVisible(true);
    setTimeout(() => {
      setIsNotificationPopupVisible(false);
    }, 4000);
  };

  const showLoginNotification = () => {
    setIslogin(true);
    setTimeout(() => {
      setIslogin(false);
    }, 2000);
  };
  // if (!user || !user._id) return <Navigate to={"/"} replace />;
  return (
    <>
      {isNotificationPopupVisible ? (
        <Notification
          notificationText="You need to set the location first!"
          onClose={() => {
            setIsNotificationPopupVisible(false);
          }}
        />
      ) : null}

      {isLogin ? (
        <Notification notificationText="Must login first!" onClose={() => {}} />
      ) : null}

      <div className="flex h-dvh flex-col items-center overflow-hidden bg-gray-50">
        <BookNav linkTo={"/"} destination={"home"} />
        <div className="flex w-full max-w-7xl justify-center bg-gray-100 py-2">
          <NavLink
            to={"package/" + bookingState.hotelPackage}
            replace={true}
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
          {user ? (
            <NavLink
              to={"location"}
              replace={true}
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
          ) : (
            <button
              onClick={showLoginNotification}
              className="font-cinzel border-b-2 border-solid px-2 text-xs md:text-sm"
            >
              Branch
            </button>
          )}
          {user ? (
            <>
              {bookingState.hotelPackage && bookingState.location ? (
                <NavLink
                  to={"schedule"}
                  replace={true}
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
              ) : (
                <button
                  className="font-cinzel border-b-2 border-solid px-2 text-xs md:text-sm"
                  onClick={showScheduleNotification}
                >
                  Schedule
                </button>
              )}
            </>
          ) : (
            <button
              className="font-cinzel border-b-2 border-solid px-2 text-xs md:text-sm"
              onClick={showLoginNotification}
            >
              Schedule
            </button>
          )}
        </div>
        <div className="h-full w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
