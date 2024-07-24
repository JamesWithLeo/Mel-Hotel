import { useEffect, useState } from "react";

import hotelRoomSm from "../assets/images/hotelRoom-sm.jpg";
import hotelRoomMd from "../assets/images/hotelRoom-md.jpg";
import hotelRoomLg from "../assets/images/hotelRoom-lg.jpg";
import PackageDeal from "../packages.component/package";
const packagesData = [
  { thumbnail: hotelRoomSm, packageName: "regular" },
  { thumbnail: hotelRoomMd, packageName: "premium" },
  { thumbnail: hotelRoomLg, packageName: "luxury" },
];
export default function Hotel() {
  const [packagesElement, setPackages] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const packagesEl = packagesData.map((data) => {
      return (
        <PackageDeal
          thumbnail={data.thumbnail}
          PackageName={data.packageName}
        />
      );
    });
    setPackages(packagesEl);
  }, []);

  return (
    <div className="flex h-max w-full flex-wrap items-center justify-evenly gap-4">
      {packagesElement.length ? packagesElement : null}
    </div>
  );
}
