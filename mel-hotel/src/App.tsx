import * as React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
interface INavClass {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}
function App() {
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

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <header className="sticky top-0 z-50 flex h-16 min-h-16 w-full max-w-7xl justify-between bg-gray-100 px-8 opacity-95 backdrop-blur backdrop-opacity-20">
        <div></div>
        <div className="flex h-full items-center gap-8 opacity-100">
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
      </header>
      <div className="flex h-full w-full max-w-7xl" id="routesWrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
