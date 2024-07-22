import { Link } from "react-router-dom";
import Gallary from "./gallary";
export default function Home() {
  return (
    <div
      className="flex h-full w-full max-w-7xl flex-col items-center bg-gray-100"
      id="homeContainer"
    >
      <Gallary />

      <div className="mb-4 w-full py-4 text-center shadow">
        <h1 className="font-cinzel text-5xl font-medium text-[#4F4A45]">
          Mel Hotel
        </h1>
        <h1 className="font-edu text-xs text-neutral-500">
          Affordable Elegance, Unforgettable Escapes
        </h1>
      </div>
      <Link
        to={"book"}
        className="bg-contrast font-fauna mb-4 rounded-full px-5 py-1 shadow drop-shadow"
      >
        Book Now!
      </Link>

      <div className="flex w-full gap-8 bg-gray-100 px-8">
        <div
          id="homeAmmenities"
          className="h-96 w-1/2 rounded p-4 shadow drop-shadow"
        >
          <h1>Home</h1>
        </div>
        <div
          id="Ammenities"
          className="h-96 w-1/2 rounded p-4 shadow drop-shadow"
        >
          <h1>Rooms & Suites</h1>
        </div>
      </div>
    </div>
  );
}
