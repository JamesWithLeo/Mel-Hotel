import Pricing from "./pricing";

export default function PricingLayout() {
  return (
    <div className="w-dvh flex">
      <div className="flex h-max w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 py-4">
        <Pricing />
      </div>
    </div>
  );
}
