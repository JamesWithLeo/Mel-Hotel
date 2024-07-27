import hotelRoom from "../assets/images/hotelRoom-md.jpg";
import hotelPool from "../assets/images/premium-pool.jpg";
import hotelGym from "../assets/images/premium-gym.jpg";
import hotelBuffet from "../assets/images/premium-buffet.jpg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetVipPackage } from "../redux slices/vipSlice";
import { hotelStore } from "../hotelStore";
export default function PremiumPackage() {
  const dispatch = useDispatch();
  const onSelectPackage = () => {
    dispatch(SetVipPackage("premium"));
    console.log(hotelStore.getState().vipBooking);
  };
  return (
    <div className="group flex h-dvh max-h-max w-full max-w-max flex-col overflow-y-auto bg-white pb-56 md:pb-20">
      <div className="sticky top-0 flex w-full flex-col bg-gray-50 bg-gradient-to-b from-gray-100 from-20% px-4 py-2 pb-4">
        <div className="flex w-full justify-between">
          <h1 className="font-fauna text-contrast text-2xl font-bold">
            Premium
          </h1>
          <NavLink
            to={"/signin"}
            onClick={onSelectPackage}
            className="bg-contrast left-[60%] rounded bg-opacity-90 px-4 py-2 text-sm group-hover:block md:fixed md:bottom-0 md:hidden md:-translate-x-1/2 md:-translate-y-1/2"
          >
            Select this Package
          </NavLink>
        </div>
        <h1 className="w-max text-sm text-slate-800">
          Affluent guests seeking enhanced comfort and luxury.
        </h1>
        <div className="flex gap-2">
          <button className="rounded bg-slate-300 px-2 text-sm">
            Review & Rating
          </button>
          <button className="rounded bg-slate-300 px-2 text-sm">Photos</button>
        </div>
      </div>
      <div className="flex w-full flex-col px-8">
        <h1>Inclusions: </h1>
        <h1>Deluxe room with a king-sized bed and a stunning city view.</h1>
        <img src={hotelRoom} className="w-2/5" alt="hotel room premium" />
        <h1>Complimentary breakfast and evening snacks.</h1>
        <h1>Daily breakfast buffet.</h1>
        <h1>
          One complimentary fine dining experience in the hotel’s premium
          restaurant.
        </h1>
        <img src={hotelBuffet} alt="hotel buffet" className="w-2/5" />
        <h1>High-speed Wi-Fi.</h1>
        <h1>Access to the swimming pool, fitness center, and spa.</h1>
        <h1>In-room mini bar (complimentary soft drinks and snacks).</h1>
        <div className="flex">
          <img src={hotelGym} alt="hotel gym" className="w-2/5" />
          <img src={hotelPool} alt="hotel pool" className="w-2/5" />
        </div>
        <h1>Complimentary welcome drinks and fruit basket.</h1>
        <h1>20% discount on spa services.</h1>
        <h1>Late check-out upon request.</h1>
      </div>
    </div>
  );
}
