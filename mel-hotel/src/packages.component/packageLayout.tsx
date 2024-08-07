import { Outlet } from "react-router-dom";
import PackageSelection from "./packageSelection";

export default function PackageLayout() {
  return (
    <div>
      <PackageSelection />
    </div>
  );
}
