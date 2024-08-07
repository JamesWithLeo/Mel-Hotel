import hotelSide from "../assets/images/hotel-at-beachside.jpg";
import luxuryBreakfast from "../assets/images/regular-breakfast.jpg";
import luxuryPool from "../assets/images/luxury-pool.jpg";
import luxuryDrink from "../assets/images/luxury-drinks.jpg";
import luxuryBalcony from "../assets/images/luxry-balcony.jpg";
import luxuryDining from "../assets/images/luxury-dining.jpg";
import hotelRommlg from "../assets/images/hotel-room.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetPackage } from "../redux slices/bookSlice";
import { hotelStore } from "../hotelStore";

export default function LuxuryPackage({
  isReadOnly = false,
}: {
  isReadOnly: boolean;
}) {
  const dispatch = useDispatch();
  const handleLuxury = () => {
    dispatch(SetPackage("luxury"));
  };
  return (
    <div
      id="packageContent"
      className="group flex h-dvh max-h-max w-full max-w-max flex-col overflow-y-auto bg-gray-100 pb-56 md:pb-20"
    >
      <div className="sticky top-0 flex w-full flex-col bg-gradient-to-b from-gray-200 from-20% to-gray-100 px-4 py-2 pb-4">
        <div className="flex w-full justify-between">
          <h1 className="font-fauna text-contrast text-2xl font-bold">
            Luxury
          </h1>
          {isReadOnly === true ? (
            <Link
              to={"/book/package/luxury"}
              className="bg-contrast left-1/2 rounded bg-opacity-90 px-4 py-2 text-sm group-hover:block md:fixed md:bottom-0 md:hidden md:-translate-x-1/2 md:-translate-y-1/2"
            >
              Book this Package
            </Link>
          ) : (
            <>
              {hotelStore.getState().auth.user ? (
                <Link
                  to={"/book/location"}
                  onClick={handleLuxury}
                  className="bg-contrast left-[60%] rounded bg-opacity-90 px-4 py-2 text-sm group-hover:block md:fixed md:bottom-0 md:hidden md:-translate-x-1/2 md:-translate-y-1/2"
                >
                  Select this Package
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="bg-contrast left-[60%] rounded bg-opacity-90 px-4 py-2 text-sm group-hover:block md:fixed md:bottom-0 md:hidden md:-translate-x-1/2 md:-translate-y-1/2"
                >
                  Select this Package
                </Link>
              )}
            </>
          )}
        </div>
        <h1 className="w-max text-sm text-slate-800">
          VIPs, entrepreneurs, and high-net-worth individuals.
        </h1>

        <div className="flex gap-2">
          <button className="rounded bg-slate-300 px-2 text-sm">
            Review & Rating
          </button>
          <button className="rounded bg-slate-300 px-2 text-sm">Photos</button>
        </div>
      </div>

      <div className="flex w-full flex-col px-8">
        <h1>Inclusions:</h1>
        <h1>
          Suite with a separate living area, private balcony, and panoramic city
          or ocean views.
        </h1>
        <div className="flex flex-wrap">
          <img src={hotelSide} alt="hotel beach side" className="w-2/5" />
          <img src={luxuryBalcony} alt="luxury Balcony" className="w-2/5" />
          <img src={hotelRommlg} alt="luxury" className="w-2/5" />
        </div>
        <h1>Complimentary breakfast, lunch, and dinner.</h1>
        <h1>
          Daily gourmet breakfast in the suite or at the hotel’s fine dining
          restaurant
        </h1>
        <h1>
          Personalized dining experiences, including private chef services.
        </h1>
        <div className="flex">
          <img src={luxuryBreakfast} alt="luxury breakfast" className="w-2/5" />
          <img src={luxuryDrink} alt="luxury breakfast" className="w-2/5" />
        </div>
        <h1>Exclusive access to the hotel's VIP dining area.</h1>
        <img src={luxuryDining} alt="luxury dining" className="w-2/5" />
        <div className="flex">
          <img src={luxuryPool} alt="luxury pool" className="w-2/5" />
        </div>
        <h1>
          Access to all hotel facilities including private pool, fitness center,
          spa, and business center.
        </h1>
        <h1>24/7 butler service.</h1>
        <h1>Ultra-high-speed Wi-Fi.</h1>
        <h1>In-room mini bar with a selection of premium beverages.</h1>
        <h1>
          VIP welcome package with premium champagne and luxury amenities.
        </h1>
        <h1>30% discount on all spa services.</h1>
        <h1>Personal concierge service for the duration of the stay.</h1>
      </div>

      <button
        className="mt-8 w-max self-center rounded px-2 text-sm text-gray-500 hover:bg-gray-100"
        onClick={() => {
          const element = document.getElementById(
            "packageContent",
          ) as HTMLElement;
          element.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Back to top
      </button>
    </div>
  );
}
