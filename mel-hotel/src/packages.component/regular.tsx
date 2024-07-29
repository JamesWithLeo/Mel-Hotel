// images
import hotelRoomSm from "../assets/images/hotelRoom-sm.jpg";
import hotelBreakfast from "../assets/images/regular-breakfast.jpg";
import hotelSwimming from "../assets/images/regular-swimmingpool.jpg";
import hotelPlay from "../assets/images/regular-play.jpg";
import hotelDrink from "../assets/images/regular-drink.jpg";
import hotelSpa from "../assets/images/regular-spa.jpg";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hotelStore } from "../hotelStore";
import { SetVipPackage } from "../redux slices/vipSlice";

export default function RegularPackage({
  isReadOnly = false,
}: {
  isReadOnly: boolean;
}) {
  const dispatch = useDispatch();
  const onSelectPackage = () => {
    dispatch(SetVipPackage("regular"));
    console.log(hotelStore.getState().vipBooking);
  };
  return (
    <div className="group flex h-dvh max-h-max w-full max-w-max flex-col overflow-y-auto bg-white pb-56 md:pb-20">
      <div className="sticky top-0 flex h-40 w-full flex-col bg-gray-50 bg-gradient-to-b from-gray-100 from-20% px-4 py-2 pb-4">
        <div className="flex justify-between">
          <h1 className="font-fauna text-contrast text-2xl font-bold">
            Regular
          </h1>
          {isReadOnly ? (
            <Link
              to={"/hotel/regular"}
              className="bg-contrast left-1/2 rounded bg-opacity-90 px-4 py-2 text-sm group-hover:block md:fixed md:bottom-0 md:hidden md:-translate-x-1/2 md:-translate-y-1/2"
            >
              Book this Package
            </Link>
          ) : (
            <>
              {hotelStore.getState().auth.isAuth ? (
                <Link
                  to={"/profile"}
                  className="bg-contrast left-[60%] rounded bg-opacity-90 px-4 py-2 text-sm group-hover:block md:fixed md:bottom-0 md:hidden md:-translate-x-1/2 md:-translate-y-1/2"
                  onClick={onSelectPackage}
                >
                  Select this Package
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="bg-contrast left-[60%] rounded bg-opacity-90 px-4 py-2 text-sm group-hover:block md:fixed md:bottom-0 md:hidden md:-translate-x-1/2 md:-translate-y-1/2"
                  onClick={onSelectPackage}
                >
                  Select this Package
                </Link>
              )}
            </>
          )}
        </div>
        <h1 className="w-max text-sm text-slate-800">
          Families and general travelers.
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
        <h1 className="">
          Standard room with a double bed and an extra bed for children.
        </h1>
        <img src={hotelRoomSm} alt="regular room" className="w-2/5" />

        <h1>Daily breakfast buffet for the family.</h1>
        <h1>
          One complimentary family dinner at the hotel restaurant during the
          stay.
        </h1>
        <img src={hotelBreakfast} alt="regular room" className="w-2/5" />
        <h1>Free Wi-Fi.</h1>
        <h1>Access to the swimming pool and fitness center.</h1>
        <h1>Kids’ play area.</h1>
        <div className="flex">
          <img src={hotelSwimming} alt="regular room" className="w-2/5" />
          <img src={hotelPlay} alt="regular room" className="w-2/5" />
        </div>
        <h1>
          Access to family-friendly games and activities organized by the hotel.
        </h1>
        <h1>Complimentary welcome drinks.</h1>
        <h1>10% discount on any spa services.</h1>
        <div className="flex">
          <img src={hotelDrink} className="w-2/5" alt="hotel drink" />
          <img src={hotelSpa} className="w-2/5" alt="hotel spa" />
        </div>
      </div>

      <h1>Back to top</h1>
    </div>
  );
}
