import PricingCard from "./pricingCard";
import { packagesData } from "../packages.component/packagesObj";
import { useEffect, useState } from "react";

import ordinaryBedroom from "../assets/images/ordinary-bedroom.jpg";
export default function Pricing() {
  const [pricingCardElement, setPricingCardElement] = useState<
    JSX.Element[] | null
  >(null);

  useEffect(() => {
    let pricingEl = packagesData.map((packageData) => {
      return <PricingCard packageObj={packageData} />;
    });
    setPricingCardElement(pricingEl);
  }, []);
  return (
    <>
      <PricingCard
        packageObj={{
          packageName: "ordinary",
          pricePerNight: 80,
          thumbnail: ordinaryBedroom,
        }}
      />
      {pricingCardElement ? pricingCardElement : null}
    </>
  );
}
