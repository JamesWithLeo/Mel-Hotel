import BookNav from "./bookNav";
import { Outlet } from "react-router-dom";

export default function Book() {
  return (
    <div className="flex h-dvh flex-col items-center overflow-hidden bg-gray-50">
      <BookNav linkTo={"/"} destination={"home"} />
      <div className="flex h-max w-full flex-col items-center justify-center gap-8 md:flex-row">
        <Outlet />
      </div>
    </div>
  );
}
