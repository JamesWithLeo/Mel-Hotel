import { hotelStore } from "../hotelStore";
import { Link } from "react-router-dom";
import ordinaryBedroom from "../assets/images/ordinary-bedroom.jpg";
import ordinaryBathroom from "../assets/images/ordinary-bathroom.jpg";

export default function Ordinary({
  isReadOnly = false,
}: {
  isReadOnly: Boolean;
}) {
  return (
    <div
      id="packageContent"
      className="group flex h-dvh max-h-max w-full max-w-max flex-col overflow-y-auto bg-white pb-56 md:pb-20"
    >
      <div className="sticky top-0 flex h-max w-full flex-col text-wrap bg-gray-50 bg-gradient-to-b from-gray-100 from-20% px-4 py-2 pb-4">
        <div className="flex justify-between">
          <h1 className="font-fauna text-contrast text-2xl font-bold">
            Ordinary Room
          </h1>
          {isReadOnly ? (
            <Link
              to={"/room"}
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
          Budget-conscious travelers and guests seeking a basic stay.
        </h1>

        <div className="flex gap-2">
          <button className="rounded bg-slate-300 px-2 text-sm">
            Review & Rating
          </button>
          <button className="rounded bg-slate-300 px-2 text-sm">Photos</button>
        </div>
      </div>

      <div className="flex w-full flex-col px-4 sm:px-8">
        <h1>Inclusions:</h1>
        <h1>Standard room with a comfortable double bed or twin beds.</h1>
        <img src={ordinaryBedroom} alt="ordinary bedroom" className="w-2/5" />
        <h1>En-suite bathroom with complimentary toiletries.</h1>
        <img src={ordinaryBathroom} alt="ordinary bathroom" className="w-2/5" />
        <h1>Free Wi-Fi.</h1>
        <h1>Flat-screen TV with cable channels</h1>
        <h1>Air Conditioning</h1>
        <h1>Coffee and tea making facilities</h1>
        <h1>Daily housekeeping</h1>
        <h1>Additional Services (Optional at Extra Cost)</h1>
        <h1>Access to the swimming pool and fitness center</h1>
        <h1>Breakfast buffet</h1>
        <h1>Laundry and dry cleaning services</h1>
        <h1>Room service</h1>
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
