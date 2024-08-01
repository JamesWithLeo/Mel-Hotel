import { isPending } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";

export interface IPackageDeal {
  PackageName: string;
  thumbnail: string;
}
export default function PackageDeal({ PackageName }: IPackageDeal) {
  return (
    <>
      <NavLink
        id="packageCard"
        className={({ isPending, isActive, isTransitioning }) =>
          [
            isPending ? "" : "",
            isActive
              ? "border-contrast w-full border-l-4 bg-white p-2 shadow drop-shadow"
              : "w-full p-2 shadow-inner",
            isTransitioning ? "" : "",
          ].join(" ")
        }
        to={PackageName}
      >
        <h1 className="font-fauna">{PackageName}</h1>
      </NavLink>
    </>
  );
}
