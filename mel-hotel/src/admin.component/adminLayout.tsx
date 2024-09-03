import { useSelector } from "react-redux";
import { Outlet, Link, Navigate, NavLink } from "react-router-dom";
import { AppState } from "../hotelStore";

export default function AdminLayout() {
  const user = useSelector((state: AppState) => state.auth.user);
  if (user?.role !== "admin") return <Navigate to={"/"} />;
  return (
    <main className="flex-row2 flex h-dvh w-full">
      <div className="font-fauna flex w-1/5 flex-col gap-2 border-r bg-[#fdedd7] px-2 py-4 lg:w-1/6">
        <Link to={"/"} className="font-cinzel text-center text-xl">
          Mel Hotel
        </Link>
        <hr className="border-gray-400" />
        <NavLink
          to={"/admin/dashboard"}
          className={({ isActive }) =>
            [
              isActive
                ? "bg-contrast w-full rounded-lg text-center text-sm text-gray-800"
                : "text-center text-sm",
            ].join(" ")
          }
        >
          dashboard
        </NavLink>
        <hr className="border-gray-400" />
        <h1 className="text-contrast w-max text-xs">collections</h1>
        <NavLink
          to={"/admin/account"}
          className={({ isActive }) =>
            [
              isActive
                ? "bg-contrast w-full rounded-lg text-center text-sm text-gray-800"
                : "text-center text-sm",
            ].join(" ")
          }
        >
          Account
        </NavLink>
        <NavLink
          to={"/admin/active"}
          className={({ isActive }) =>
            [
              isActive
                ? "bg-contrast w-full rounded-lg text-center text-sm text-gray-800"
                : "text-center text-sm",
            ].join(" ")
          }
        >
          Active
        </NavLink>
        <NavLink
          to={"/admin/pending"}
          className={({ isActive }) =>
            [
              isActive
                ? "bg-contrast w-full rounded-lg text-center text-sm text-gray-800"
                : "text-center text-sm",
            ].join(" ")
          }
        >
          Pending
        </NavLink>
        <NavLink
          to={"/admin/expire"}
          className={({ isActive }) =>
            [
              isActive
                ? "bg-contrast w-full rounded-lg text-center text-sm text-gray-800"
                : "text-center text-sm",
            ].join(" ")
          }
        >
          expire
        </NavLink>
      </div>

      <div className="h-full w-10/12">
        <Outlet />
      </div>
    </main>
  );
}
