import Pricing from "./pricing";

export default function PricingLayout() {
  return (
    <div className="flex w-full">
      <div className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <Pricing />
      </div>
    </div>
  );
}
