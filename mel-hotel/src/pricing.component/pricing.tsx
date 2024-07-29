import PricingCard from "./pricingCard";
export default function Pricing() {
  return (
    <>
      <PricingCard packageName="Ordinary" />
      <PricingCard packageName="Regular" />
      <PricingCard packageName="Premium" />
      <PricingCard packageName="Luxury" />
    </>
  );
}
