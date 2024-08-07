import hotelRoom from "../assets/images/hotelRoom-md.jpg";
import hotelPool from "../assets/images/premium-pool.jpg";
import hotelGym from "../assets/images/premium-gym.jpg";
import hotelBuffet from "../assets/images/premium-buffet.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetPackage } from "../redux slices/bookSlice";
import { hotelStore } from "../hotelStore";
export default function PremiumPackage({
  isReadOnly = false,
}: {
  isReadOnly: boolean;
}) {
  const dispatch = useDispatch();

  const handlePremium = () => {
    dispatch(SetPackage("premium"));
  };
  return (
    <div
      id="packageContent"
      className="group flex h-dvh max-h-max w-full max-w-max flex-col overflow-y-auto bg-gray-100 pb-56 md:pb-20"
    >
      <div className="sticky top-0 flex w-full flex-col bg-gradient-to-b from-gray-200 from-20% to-gray-100 px-4 py-2 pb-4">
        <div className="flex w-full justify-between">
          <h1 className="font-fauna text-contrast text-2xl font-bold">
            Premium
          </h1>

          {isReadOnly ? (
            <Link
              to={"/book/package/premium"}
              className="bg-contrast left-1/2 rounded bg-opacity-90 px-4 py-2 text-sm group-hover:block md:fixed md:bottom-0 md:hidden md:-translate-x-1/2 md:-translate-y-1/2"
            >
              Book this Package
            </Link>
          ) : (
            <>
              {hotelStore.getState().auth.user ? (
                <Link
                  to={"/book/location"}
                  className="bg-contrast left-[60%] rounded bg-opacity-90 px-4 py-2 text-sm group-hover:block md:fixed md:bottom-0 md:hidden md:-translate-x-1/2 md:-translate-y-1/2"
                  onClick={handlePremium}
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
          Affluent guests seeking enhanced comfort.
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
