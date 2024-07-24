import BookNav from "./bookNav";
import { NavLink, Outlet } from "react-router-dom";

export default function Book() {
  return (
    <div className="flex h-dvh flex-col items-center gap-4 bg-gray-100 p-4 py-4 pb-16 lg:px-8">
      <BookNav />
      <div className="flex h-full w-full justify-center gap-8">
        <Outlet />
      </div>
    </div>
  );
}
