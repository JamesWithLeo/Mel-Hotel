import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PackageDeal from "./packageButton";

import { packagesData } from "./packagesObj";
let date = new Date().toLocaleDateString().split("/");
if (date[0].length === 1) {
  date[0] = 0 + date[0];
}

export default function PackageSelection() {
  const [packagesElement, setPackages] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const packagesEl = packagesData.map((data) => {
      return (
        <PackageDeal
          thumbnail={data.thumbnail}
          PackageName={data.packageName}
          key={crypto.randomUUID()}
        />
      );
    });
    setPackages(packagesEl);
  }, []);
  return (
    <main className="z-0 flex flex-col items-center">
      <div className="flex h-full w-full max-w-7xl flex-col flex-wrap justify-center md:flex-row">
        <div className="fixed bottom-0 flex w-full flex-col items-center bg-gray-100 shadow md:relative md:h-dvh md:w-1/4">
          <h1 className="font-cinzel test-sm text-center text-base md:text-base">
            Mel Hotel provides four tailored hotel packages
          </h1>
          <h1 className="text-sm">Choose a package: </h1>
          {packagesElement.length ? packagesElement : null}
        </div>
        <div className="flex md:w-3/4">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
