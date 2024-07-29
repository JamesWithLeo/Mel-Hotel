import hotelCozyroom from "../assets/images/hotelRoom-sm.jpg";
import hotelFacade from "../assets/images/hotel-scenries1.jpg";
import hotelPool1 from "../assets/images/luxury-pool.jpg";
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
        className="bg-contrast font-fauna active:text-primarydark mb-4 rounded-full px-5 py-1 shadow drop-shadow duration-200 ease-in-out hover:scale-x-[1.05] active:shadow-[inset_0px_2px_5px_5px_#0000004d]"
      >
        Book Now!
      </Link>

      <div className="flex w-full flex-col gap-4 bg-gray-100 px-8 py-4 sm:flex-col">
        <div
          id="homeAmmenities"
          className="grid h-40 grid-cols-3 grid-rows-3 overflow-hidden rounded shadow drop-shadow sm:w-1/3 md:h-60"
        >
          <div className="z-10 col-span-3 row-span-1 row-start-2 flex items-center justify-center text-gray-200 backdrop-brightness-50 lg:text-5xl">
            <h1 className="font-bebas opacity-70">Wonderful sceneries</h1>
          </div>

          <img
            src={hotelFacade}
            alt="hotel scenery"
            className="col-span-3 col-start-1 col-end-4 row-start-1 columns-1"
          />
        </div>

        <div
          id="Ammenities"
          className="grid h-40 w-1/3 grid-cols-1 grid-rows-3 overflow-hidden rounded shadow drop-shadow md:h-60"
        >
          <div className="z-10 flex items-center justify-center text-gray-200 backdrop-brightness-50 lg:text-5xl">
            <h1 className="font-bebas">Cozy Rooms</h1>
          </div>
          <img
            src={hotelCozyroom}
            alt="cozy room"
            className="col-start-1 row-start-1"
          />
        </div>

        <div
          id="Ammenities"
          className="grid h-40 w-1/3 grid-cols-1 grid-rows-3 overflow-hidden rounded shadow drop-shadow md:h-60"
        >
          <div className="z-10 flex items-center justify-center text-gray-200 backdrop-brightness-50 lg:text-5xl">
            <h1 className="font-bebas">Private Pools</h1>
          </div>
          <img src={hotelPool1} alt="" className="col-start-1 row-start-1" />
        </div>
      </div>
      <footer className="flex h-96 w-full">
        <h1 className="flex h-96 w-full">foot</h1>
      </footer>
    </div>
  );
}
