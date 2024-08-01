import { Link } from "react-router-dom";
type packageTypeface = {
  packageName: string;
  pricePerNight: number;
  thumbnail: string;
};
type PricingCardTypeface = {
  packageObj: packageTypeface;
};
export default function PricingCard({ packageObj }: PricingCardTypeface) {
  return (
    <div className="grid h-max w-80 grid-cols-1 grid-rows-1 overflow-hidden rounded bg-gray-100 shadow">
      <img
        src={packageObj.thumbnail}
        alt="package thumbnail"
        className="col-start-1 row-span-2 row-start-1 row-end-3"
      />
      <div className="from-primarydark col-start-1 row-start-2 flex flex-col bg-gradient-to-tr px-2 py-2">
        <h1 className="font-cinzel text-contrast col-start-1 row-start-2 text-2xl">
          {packageObj.packageName}
        </h1>
        <h1 className="font-fauna text-priamrydark col-start-1 row-start-3 text-stone-300">
          ${packageObj.pricePerNight.toString()}
        </h1>
        <Link
          to={"/" + packageObj.packageName.toLowerCase()}
          className="col-start-1 row-start-4 text-center text-neutral-400 underline-offset-2 hover:underline"
        >
          See details
        </Link>
      </div>
    </div>
  );
}
