import { Link } from "react-router-dom";

type PricingCardTypeface = {
  packageName: string;
};
export default function PricingCard({ packageName }: PricingCardTypeface) {
  return (
    <div className="h-96 w-1/5 rounded bg-gray-100 shadow">
      <h1 className="font-fauna text-contrast">{packageName}</h1>
      <Link to={"/" + packageName.toLowerCase()}>See details</Link>
    </div>
  );
}
