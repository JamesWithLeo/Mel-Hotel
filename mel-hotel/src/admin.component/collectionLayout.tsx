import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function CollectionLayout() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <Outlet />
    </div>
  );
}
