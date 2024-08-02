import {
  faHouse,
  faScrewdriverWrench,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  return (
    <main className="flex h-dvh w-full gap-2 bg-gray-100">
      {!isNavVisible ? (
        <div className="fixed bottom-3 left-1/2 flex w-[96%] -translate-x-1/2 flex-row justify-center gap-4 rounded bg-gray-200 px-3 py-2 sm:relative sm:left-4 sm:top-4 sm:h-[96%] sm:w-max sm:-translate-x-0 sm:flex-col sm:justify-normal">
          <Link
            to={"/"}
            className="text-primarydarker hover:text-contrast text-xl"
          >
            <FontAwesomeIcon icon={faHouse} />
          </Link>

          <button
            className="text-primarydarker hover:text-contrast text-xl"
            onClick={() => {
              setIsNavVisible(true);
            }}
          >
            <FontAwesomeIcon icon={faScrewdriverWrench} />
          </button>
        </div>
      ) : (
        <div className="fixed z-10 flex h-full w-1/2 flex-col gap-2 bg-gray-100 py-4 shadow sm:relative sm:flex sm:w-1/6">
          <div className="w-max self-end px-4">
            <button
              onClick={() => {
                setIsNavVisible(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="flex w-full flex-col">
            <h1 className="px-4 text-sm font-bold">Database</h1>
            <NavLink
              to={"collections"}
              className={"px-4 py-1 hover:bg-gray-100"}
            >
              Collections
            </NavLink>
          </div>
        </div>
      )}
      {isNavVisible ? (
        <div
          id="outletMask"
          className="fixed z-0 h-full w-full bg-slate-300 opacity-50 sm:hidden"
          onClick={() => {
            setIsNavVisible(false);
          }}
        ></div>
      ) : null}
      <div className="h-full w-full">
        <Outlet />
      </div>
    </main>
  );
}
