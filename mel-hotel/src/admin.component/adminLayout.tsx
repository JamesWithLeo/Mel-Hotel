import { useSelector } from "react-redux";
import { Outlet, Link, Navigate } from "react-router-dom";
import { AppState } from "../hotelStore";

export default function AdminLayout() {
  const user = useSelector((state: AppState) => state.auth.user);
  if (user?.role !== "admin") return <Navigate to={"/"} />;
  return (
    <main className="flex h-dvh w-full flex-col gap-2 bg-gray-100">
      <Link to={"/"}>Back to homepage</Link>
      <div className="flex flex-row items-center gap-2">
        <h1 className="text-contrast w-max font-bold">Collections</h1>
        <Link
          to={"account"}
          className="w-max rounded px-2 py-1 text-neutral-500 outline-1 outline-gray-200 hover:bg-gray-100 hover:text-gray-600 hover:shadow hover:outline"
        >
          Account
        </Link>
        <Link
          to={"book"}
          className="w-max rounded px-2 py-1 text-neutral-500 outline-1 outline-gray-200 hover:bg-gray-100 hover:text-gray-600 hover:shadow hover:outline"
        >
          Book
        </Link>
      </div>

      <div className="h-full w-full">
        <Outlet />
      </div>
    </main>
  );
}
