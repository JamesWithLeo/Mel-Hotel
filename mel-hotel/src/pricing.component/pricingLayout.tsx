import { Outlet } from "react-router-dom";
import Pricing from "./pricing";

export default function PricingLayout() {
  return (
    <div className="flex w-full">
      <div className="flex w-full items-center justify-center gap-8">
        <Pricing />
      </div>
    </div>
  );
}
